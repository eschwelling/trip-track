require 'rails_helper'

RSpec.describe Stop, :type => :model do
  it "is not valid without a mbta_id" do
      stop = Stop.create(mbta_id: nil, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil)
    expect(stop).to_not be_valid
    expect(stop.errors.messages).to eq(:mbta_id=>["can't be blank"])
  end

  it "is not valid without a name" do
    stop = Stop.create(mbta_id: 5515, name: nil, description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil)
    expect(stop).to_not be_valid
    expect(stop.errors.messages).to eq(:name=>["can't be blank"])
  end

  it "is valid without a description" do
    stop = Stop.create(mbta_id: 5515, name: "Lynn St @ Spring Pond Rd", description: nil, address: nil, latitude: "42.498558", longitude: "-70.954141", platform_name: nil)
    expect(stop).to be_valid
  end
end
