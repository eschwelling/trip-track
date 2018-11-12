require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do

  let!(:current_user) { (User.create(id: 3, first_name: "Buddy", last_name: "Franklin", email: "bud@franklin.com", user_name: "buddy", password: "budbud", "profile_photo": nil, role: "f")) }

  describe "GET#index" do
    it "should return the current user" do

    sign_in current_user
    get :index, params: {user_id: current_user}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type). to eq ("application/json")

      expect(returned_json.length).to eq 9

      expect(returned_json["email"]).to eq current_user.email
      expect(returned_json["first_name"]).to eq current_user.first_name
    end
  end
end
