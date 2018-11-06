# require 'rails_helper'
#
# RSpec.describe User, type: :model do
#   it "is not valid without a email" do
#       user = User.create!(email: nil, first_name: "Joe", last_name: "Billybob", user_name: "joebob", profile_photo: nil, role: "f")
#       expect(user).to_not be valid
#       expect(user.errors.messages).to eq("Email can't be blank")
#   end
#
#   it "is not valid without a first name" do
#       user = User.create!(email: "joejoe@gmail.com", first_name: nil, last_name: "Billybob", user_name: "joebob", profile_photo: nil, role: "f")
#       expect(user).to_not be valid
#       expect(user.errors.messages).to eq("First name can't be blank")
#   end
#
#   it "is not valid without a last name" do
#       user = User.create!(email: "joejoe@gmail.com", first_name: "Joe", last_name: nil, user_name: "joebob", profile_photo: nil, role: "f")
#       expect(user).to_not be valid
#       expect(user.errors.messages).to eq("Last name can't be blank")
#   end
#
#   it "is not valid without user name" do
#       user = User.create!(email: "joejoe@gmail.com", first_name: "Joe", last_name: "Billybob", user_name: nil, profile_photo: nil, role: "f")
#       expect(user).to_not be valid
#       expect(user.errors.messages).to eq("User name can't be blank")
#   end
# end
