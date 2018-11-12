require 'rails_helper'

RSpec.describe Note, :type => :model do
  origin = Stop.create(mbta_id: 4918, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil)

  destination = Stop.create(mbta_id: 70007, name: "Jackson Square", description: "Jackson Square - Orange Line - Oak Grove", address: nil, latitude: "42.323132", longitude: "-71.099592", platform_name: "Oak Grove")

  line = Line.create(name: "Green Line C", short_name: "C", description: "Rapid Transit", mbta_id: "Green-C")

  journey = Journey.create(origin: origin, destination: destination, line: line, direction_id: 1, user_id: 2)

  user = User.create(first_name: "Bill", last_name: "Buckner", email: "bill@redsox.org", user_name: "FirstBase", password: "throughthelegs", "profile_photo": nil, role: "f")

  it "is not valid without a journey" do
    note = Note.create(journey: nil, user: user, body: "good trip today!", photo_path: "www.google.com/images/goodtrip.jpg")
    expect(note).to_not be_valid
    expect(note.errors.messages).to eq(:journey=>["must exist"])
  end

  it "is not valid without a user" do
    note = Note.create(journey: journey, user: nil, body: "good trip today!", photo_path: "www.google.com/images/goodtrip.jpg")
    expect(note).to_not be_valid
    expect(note.errors.messages).to eq(:user=>["must exist"])
  end

  it "is not valid without a body" do
    note = Note.create(journey: journey, user: user, body: nil, photo_path: "www.google.com/images/goodtrip.jpg")
    expect(note).to_not be_valid
    expect(note.errors.messages).to eq(:body=>["can't be blank"])
  end
end
