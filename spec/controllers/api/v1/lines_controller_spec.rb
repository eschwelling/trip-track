require 'rails_helper'

RSpec.describe Api::V1::LinesController, type: :controller do

  let!(:line1) { (Line.create(name: "Green Line C", short_name: "C", description: "Rapid Transit", mbta_id: "Green-C")) }

  let!(:line2) { (Line.create(name: "Design Center - South Station", short_name: "SL2", description: "Rapid Transit", mbta_id: "742")) }

  let!(:line3) { (Line.create( name: "Sullivan - Central Square, Cambridge", short_name: "91", description: "Local Bus", mbta_id: "91")) }

  describe "GET#index" do
    it "should return all lines" do

    get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type). to eq ("application/json")

      expect(returned_json.length).to eq 3

      expect(returned_json[0]["mbta_id"]).to eq line1.mbta_id
      expect(returned_json[1]["name"]).to eq line2.name
      expect(returned_json[2]["description"]).to eq line3.description
    end
  end
end
