require 'rails_helper'

RSpec.describe Journey, :type => :model do
  origin = Stop.create(mbta_id: 4918, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil)

  destination = Stop.create(mbta_id: 70007, name: "Jackson Square", description: "Jackson Square - Orange Line - Oak Grove", address: nil, latitude: "42.323132", longitude: "-71.099592", platform_name: "Oak Grove")

  user = User.create(first_name: "Manny", last_name: "Ramirez", email: "manny@redsox.com", user_name: "Manny24", password: "legend", "profile_photo": nil, role: "f")

  line = Line.create(name: "Green Line C", short_name: "C", description: "Rapid Transit", mbta_id: "Green-C")

  it "is not valid without an origin" do
    journey = Journey.create(origin: nil, destination: destination, line: line, direction_id: 1, user: user)
    expect(journey).to_not be_valid
    expect(journey.errors.messages).to eq(:origin=>["can't be blank", "must exist"])
  end

  it "is not valid without a destination" do
    journey = Journey.create(origin: origin, destination: nil, line: line, direction_id: 1, user: user)
    expect(journey).to_not be_valid
    expect(journey.errors.messages).to eq(:destination=>["can't be blank", "must exist"])
  end

  it "is not valid without a line" do
    journey = Journey.create(origin: origin, destination: destination, line: nil, direction_id: 1, user: user)
    expect(journey).to_not be_valid
    expect(journey.errors.messages).to eq(:line=>["can't be blank", "must exist"])
  end

  it "is not valid without a direction_id" do
    journey = Journey.create(origin: origin, destination: destination, line: line, direction_id: nil, user: user)
    expect(journey).to_not be_valid
    expect(journey.errors.messages).to eq(:direction_id=>["can't be blank"])
  end
end
