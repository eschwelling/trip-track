require 'rails_helper'

RSpec.describe Line, :type => :model do
  it "is not valid without a name" do
    line = Line.create(name: nil, short_name: "C", description: "Rapid Transit", mbta_id: "Green-C")
    expect(line).to_not be_valid
    expect(line.errors.messages).to eq(:name=>["can't be blank"])
  end

  it "is not valid without a short_name" do
    line = Line.create(name: "Green Line C", short_name: nil, description: "Rapid Transit", mbta_id: "Green-C")
    expect(line).to_not be_valid
    expect(line.errors.messages).to eq(:short_name=>["can't be blank"])
  end

  it "is not valid without a description" do
    line = Line.create(name: "Green Line C", short_name: "C", description: nil, mbta_id: "Green-C")
    expect(line).to_not be_valid
    expect(line.errors.messages).to eq(:description=>["can't be blank"])
  end

  it "is not valid without a mbta_id" do
    line = Line.create(name: "Green Line C", short_name: "C", description: "Rapid Transit", mbta_id: nil)
    expect(line).to_not be_valid
    expect(line.errors.messages).to eq(:mbta_id=>["can't be blank"])
  end
end
