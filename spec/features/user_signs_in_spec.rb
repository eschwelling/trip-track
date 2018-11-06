require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to sign in
  So that I can regain access to my account
} do
#   scenario 'specify valid credentials' do
#     user = User.create!(email: "test@test.org", first_name: "Joe", last_name: "Billybob", user_name: "joebob", profile_photo: nil, role: "f")
#
#     visit new_user_session_path
#
#     fill_in 'Email', with: user.email
#     fill_in 'Password', with: user.password
#
#     click_button 'Log in'
#
#     expect(page).to have_content('Signed in successfully')
#     expect(page).to have_content('Sign Out')
#   end
#
#   scenario 'specify invalid credentials' do
#     visit new_user_session_path
#
#     click_button 'Log in'
#     expect(page).to have_content('Invalid Email or password')
#     expect(page).to_not have_content('Sign Out')
#   end
# end
