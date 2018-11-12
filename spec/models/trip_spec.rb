require 'rails_helper'

RSpec.describe Trip, :type => :model do
  origin = Stop.create(mbta_id: 4918, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil)

  destination = Stop.create(mbta_id: 70007, name: "Jackson Square", description: "Jackson Square - Orange Line - Oak Grove", address: nil, latitude: "42.323132", longitude: "-71.099592", platform_name: "Oak Grove")

  line = Line.create(name: "Green Line C", short_name: "C", description: "Rapid Transit", mbta_id: "Green-C")

  journey = Journey.create(origin: origin, destination: destination, line: line, direction_id: 1, user_id: 2)

  it "is not valid without a journey" do
    trip = Trip.create(journey: nil, arrival: "12:05PM", departure: "12:43PM")
    expect(trip).to_not be_valid
    expect(trip.errors.messages).to eq(:journey=>["must exist"])
  end

  it "is not valid without an arrival time" do
    trip = Trip.create(journey: journey, arrival: nil, departure: "12:43PM")
    expect(trip).to_not be_valid
    expect(trip.errors.messages).to eq(:arrival=>["can't be blank"])
  end

  it "is not valid without a departure time" do
    trip = Trip.create(journey: journey, arrival: "12:05PM", departure: nil)
    expect(trip).to_not be_valid
    expect(trip.errors.messages).to eq(:departure=>["can't be blank"])
  end
end
