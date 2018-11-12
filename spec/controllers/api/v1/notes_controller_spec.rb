require 'rails_helper'

RSpec.describe Api::V1::NotesController, type: :controller do

  let!(:current_user) { (User.create(id: 3, first_name: "Buddy", last_name: "Franklin", email: "bud@franklin.com", user_name: "buddy", password: "budbud", "profile_photo": nil, role: "f")) }

  let!(:origin) { (Stop.create(mbta_id: 4918, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil)) }

  let!(:destination) { (Stop.create(mbta_id: 70007, name: "Jackson Square", description: "Jackson Square - Orange Line - Oak Grove", address: nil, latitude: "42.323132", longitude: "-71.099592", platform_name: "Oak Grove")) }

  let!(:line) { (Line.create(name: "Green Line C", short_name: "C", description: "Rapid Transit", mbta_id: "Green-C")) }

  let!(:journey) { (Journey.create(id: 50, origin: origin, destination: destination, line: line, direction_id: 1, user: current_user)) }

  let!(:note1) { (Note.create(journey_id: 50, user: current_user, body: "good trip today!", photo_path: "www.google.com/images/goodtrip.jpg")) }

  let!(:note2) { (Note.create(journey_id: 50, user: current_user, body: "what a mess!", photo_path: "www.pictures.com/badtrip.png")) }

  let!(:note3) { (Note.create(journey_id: 50, user: current_user, body: "rainy day blues.", photo_path: nil)) }

  describe "GET#index" do
    it "should return all notes associated with a journey" do

    sign_in current_user
    get :index, params: {journey_id: journey.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type). to eq ("application/json")

      expect(returned_json["notes"].length).to eq 3

      expect(returned_json["notes"][0]["body"]).to eq note1.body
      expect(returned_json["notes"][1]["body"]).to eq note2.body
      expect(returned_json["notes"][2]["body"]).to eq note3.body
    end
  end
end
