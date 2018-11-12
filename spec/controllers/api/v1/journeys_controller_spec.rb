require 'rails_helper'

RSpec.describe Api::V1::JourneysController, type: :controller do

  let!(:current_user) { (User.create(id: 3, first_name: "Buddy", last_name: "Franklin", email: "bud@franklin.com", user_name: "buddy", password: "budbud", "profile_photo": nil, role: "f")) }

  let!(:origin1) { (Stop.create(mbta_id: 4918, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil))}

  let!(:destination1) {(Stop.create(mbta_id: 70007, name: "Jackson Square", description: "Jackson Square - Orange Line - Oak Grove", address: nil, latitude: "42.323132", longitude: "-71.099592", platform_name: "Oak Grove"))}

  let!(:line1) {(Line.create(name: "Green Line C", short_name: "C", description: "Rapid Transit", mbta_id: "Green-C"))}

  let!(:origin2) { (Stop.create(mbta_id: 32818, name: "1661 Hyde Park Ave", description: nil, address: nil, latitude: "42.241728", longitude: "-71.130753", platform_name: nil))}

  let!(:destination2) {(Stop.create(mbta_id: 6851, name: "Eastern Ave @ Waitt Ave", description: nil, address: nil, latitude: "42.483738", longitude: "-70.939851", platform_name: nil))}

  let!(:line2) {(Line.create(name: "Sullivan - Central Square, Cambridge", short_name: "91", description: "Local Bus", mbta_id: "91"))}

  let!(:journey1) {(Journey.create(origin: origin1, destination: destination1, user: current_user, line: line1, direction_id: 0))}

  let!(:journey2) {(Journey.create(origin: origin2, destination: destination2, user: current_user, line: line2, direction_id: 1))}

  describe "GET#index" do
    it "should return all journeys associated with the current user" do

    sign_in current_user
    get :index, params: {user_id: current_user}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type). to eq ("application/json")

      expect(returned_json["journeys"].length).to eq 2

      expect(returned_json["journeys"][0]["origin"]["name"]).to eq journey1.origin.name
      expect(returned_json["journeys"][1]["destination"]["description"]).to eq journey2.destination.description
    end
  end

  describe "GET#show" do
    it "should return a single journey associated with params" do
      sign_in current_user
      get :show, params: {id: journey1.id}
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type). to eq ("application/json")

        expect(returned_json.length).to eq 1

        expect(returned_json["journey"]["origin"]["name"]).to eq journey1.origin.name
        expect(returned_json["journey"]["destination"]["name"]).to eq journey1.destination.name
    end
  end
end
