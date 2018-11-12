require 'rails_helper'
require_relative "../../app/models/user.rb"

RSpec.describe User, :type => :model do

  it "is not valid without a First Name" do
    test_user = User.create(first_name: nil, last_name: "Wonka", email: "BilliamWonka@chocolate.com", user_name: "GoldenTicket", password: "gobstopper", "profile_photo": nil, role: "f")
    expect(test_user).to_not be_valid
    expect(test_user.errors.messages).to eq(:first_name=>["can't be blank"])
  end

  it "is not valid without a Last Name" do
    test_user = User.create(first_name: "William", last_name: nil, email: "BilliamWonka@chocolate.com", user_name: "GoldenTicket", password: "gobstopper", "profile_photo": nil, role: "f")
    expect(test_user).to_not be_valid
    expect(test_user.errors.messages).to eq(:last_name=>["can't be blank"])
  end

  it "is not valid without a Email" do
    test_user = User.create(first_name: "William", last_name: "Wonka", email: nil, user_name: "GoldenTicket", password: "gobstopper", "profile_photo": nil, role: "f")
    expect(test_user).to_not be_valid
    expect(test_user.errors.messages).to eq(:email=>["can't be blank"])
  end

  it "is not valid without a User Name" do
  test_user = User.create(first_name: "William", last_name: "Wonka", email: "BilliamWonka@chocolate.com", user_name: nil, password: "gobstopper", "profile_photo": nil, role: "f")
    expect(test_user).to_not be_valid
    expect(test_user.errors.messages).to eq(:user_name=>["can't be blank"])
  end

  it "is not valid without a Password" do
    test_user = User.create(first_name: "William", last_name: "Wonka", email: "BilliamWonka@chocolate.com", user_name: "GoldenTicket", password: nil, "profile_photo": nil, role: "f")
    expect(test_user).to_not be_valid
    expect(test_user.errors.messages).to eq(:encrypted_password=>["can't be blank"], :password=>["can't be blank"])
  end

  it "has a default Role value of f" do
  test_user = User.create(first_name: "William", last_name: "Wonka", email: "BilliamWonka@chocolate.com", user_name: "GoldenTicket", password: "gobstopper", "profile_photo": nil, role: "f")
    expect(test_user).to be_valid
  end

  it "is valid without a profile photo" do
    test_user = User.create(first_name: "William", last_name: "Wonka", email: "BilliamWonka@chocolate.com", user_name: "GoldenTicket", password: "gobstopper", "profile_photo": nil, role: "f")
    expect(test_user).to be_valid
  end

end
