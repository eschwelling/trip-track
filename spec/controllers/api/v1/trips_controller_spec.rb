require 'rails_helper'

RSpec.describe Api::V1::TripsController, type: :controller do

  let!(:current_user) { (User.create(id: 3, first_name: "Buddy", last_name: "Franklin", email: "bud@franklin.com", user_name: "buddy", password: "budbud", "profile_photo": nil, role: "f")) }

  let!(:origin) { (Stop.create(mbta_id: 4918, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil))}

  let!(:destination) { (Stop.create(mbta_id: 70007, name: "Jackson Square", description: "Jackson Square - Orange Line - Oak Grove", address: nil, latitude: "42.323132", longitude: "-71.099592", platform_name: "Oak Grove"))}

  let!(:line) { (Line.create(name: "Green Line C", short_name: "C", description: "Rapid Transit", mbta_id: "Green-C"))}

  let!(:journey) { (Journey.create(id: 50, origin: origin, destination: destination, line: line, direction_id: 1, user: current_user))}

  let!(:trip1) { (Trip.create(journey: journey, arrival: "1:24PM", departure: "2:06PM"))}

  let!(:trip2) { (Trip.create(journey: journey, arrival: "3:55PM", departure: "4:22PM"))}

  let!(:trip3) { (Trip.create(journey: journey, arrival: "6:43AM", departure: "7:12AM"))}


  describe "GET#index" do
    it "should return all trips associated with the selected journey" do

    sign_in current_user
    get :index, params: {journey_id: journey.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type). to eq ("application/json")

      expect(returned_json["trips"].length).to eq 3

      expect(returned_json["trips"][0]["arrival"]).to eq trip1.arrival
      expect(returned_json["trips"][1]["departure"]).to eq trip2.departure
      expect(returned_json["trips"][2]["arrival"]).to eq trip3.arrival
    end
  end

  describe "GET#show" do
    it "should return a specific trip associated with the selected journey" do
      sign_in current_user
      get :show, params: {journey_id: journey.id, id: trip1.id}

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type). to eq ("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["trip"]["arrival"]).to eq trip1.arrival
      expect(returned_json["trip"]["departure"]).to eq trip1.departure

    end
  end
end
