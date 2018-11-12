require 'rails_helper'

RSpec.describe Api::V1::StopsController, type: :controller do

  let!(:stop1) { (Stop.create(mbta_id: 4415, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil)) }

  let!(:stop2) { (Stop.create(mbta_id: 16458, name: "Cummins Hwy @ Fairway St", description: nil, address: nil, latitude: "42.268381", longitude: "-71.095147", platform_name: nil)) }

  let!(:stop3) { (Stop.create(mbta_id: 28618, name: "785 Washington St @ Norwood Hospital", description: nil, address: nil, latitude: "42.189527", longitude: "-71.202699", platform_name: nil)) }

  describe "GET#index" do
    it "should return all stops" do

    get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type). to eq ("application/json")

      expect(returned_json.length).to eq 3

      expect(returned_json[0]["mbta_id"]).to eq stop1.mbta_id
      expect(returned_json[1]["name"]).to eq stop2.name
      expect(returned_json[2]["latitude"]).to eq stop3.latitude
    end
  end

  describe "GET#search" do
    it "should return a stop with the search params" do
      get :search, params: {search_string: stop1.name}

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type). to eq ("application/json")
      expect(returned_json.length).to eq 1

      expect(returned_json[0]["mbta_id"]).to eq stop1.mbta_id
    end
  end
end
