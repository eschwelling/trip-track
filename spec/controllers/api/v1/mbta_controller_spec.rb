require 'rails_helper'

RSpec.describe Api::V1::MbtaController, type: :controller do
  def mbta_response(data, code: 200)
    double(code: code, body: { data: data }.to_json)
  end

  def mbta_stop(id, name)
    { "id" => id, "attributes" => { "name" => name, "latitude" => "42.337402", "longitude" => "-71.072162" } }
  end

  describe "GET#stops" do
    it "returns the route's stops resolved to local records" do
      existing = Stop.create!(mbta_id: 10015, name: "Harrison Ave @ E Newton St")
      allow(HTTParty).to receive(:get).and_return(
        mbta_response([mbta_stop("10015", "Harrison Ave @ E Newton St"), mbta_stop("25", "E Broadway @ L St")])
      )

      get :stops, params: { route: "10", direction_id: "0" }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      # Route order is preserved so the first and last stop stay sensible defaults
      expect(returned_json["stops"].map { |stop| stop["mbta_id"] }).to eq [10015, 25]
      expect(returned_json["stops"].first["id"]).to eq existing.id
    end

    it "creates local records for stops that were never seeded" do
      allow(HTTParty).to receive(:get).and_return(mbta_response([mbta_stop("25", "E Broadway @ L St")]))

      expect {
        get :stops, params: { route: "10", direction_id: "0" }
      }.to change { Stop.count }.by(1)

      expect(Stop.find_by(mbta_id: 25).name).to eq "E Broadway @ L St"
      expect(JSON.parse(response.body)["stops"].first["id"]).to eq Stop.find_by(mbta_id: 25).id
    end

    it "leaves out stops whose MBTA id is not numeric" do
      allow(HTTParty).to receive(:get).and_return(
        mbta_response([mbta_stop("place-portr", "Porter Square"), mbta_stop("25", "E Broadway @ L St")])
      )

      get :stops, params: { route: "10", direction_id: "0" }

      # The integer mbta_id column can't hold "place-..." ids, so offering them
      # would produce a stop the user can't actually save.
      expect(JSON.parse(response.body)["stops"].map { |stop| stop["mbta_id"] }).to eq [25]
    end

    it "reports a bad gateway when the MBTA API errors" do
      allow(HTTParty).to receive(:get).and_return(mbta_response([], code: 429))

      get :stops, params: { route: "10", direction_id: "0" }

      expect(response.status).to eq 502
      expect(JSON.parse(response.body)["errors"].first["title"]).to eq "MBTA API error"
    end

    it "reports a bad gateway when the MBTA API is unreachable" do
      allow(HTTParty).to receive(:get).and_raise(Timeout::Error)

      get :stops, params: { route: "10", direction_id: "0" }

      expect(response.status).to eq 502
    end
  end
end
