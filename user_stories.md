# TripTrack Core User Stories

1. As an MBTA commuter,  
I want to be able to create an account,  
So that I can have a unique identity on TripTrack.

  > Scenario: a user wants to create a new account

  [] When I visit the root path, there is an option to sign up on the page   
  [] I must enter a valid email, password, first name and last name   
  [] If I enter improper information, I receive an error message

2. As an MBTA commuter,  
I want to be able to add a profile picture,  
So that I can have a visual representation on TripTrack.   

  > Scenario: a user wants to add a profile picture

  [] There is an option to upload a profile picture during the sign up process    
  [] I must enter a valid email, password, first name and last name       
  [] If I enter improper information, I receive an error message

3. As an MBTA commuter,  
I want to be able to sign in to my account,  
So that I can access my individual account information.   

  > Scenario: a user wants to sign in

  [] When I visit the root path, there is an option to log into my account       
  [] If I log in to my account, I receive a successful log-in message   

4. As an MBTA commuter,  
I want to be able to see all MBTA routes,  
So that I can choose my commute route.    

  > Scenario: a user visits the index page

  [] When I visit the root path, I can see all the MBTA routes   
  [] I can click on an individual route   
  [] The link will redirect to a route show page

4. As an MBTA commuter,  
I want to be able to select my MBTA route,  
So that I can see the schedule for my commute.

  > Scenario: a user visits a route show page

  [] When I visit the show page, I can see a schedule for the selected route   

3. As an MBTA commuter,  
I want to be able to select my MBTA route,  
So that I can choose the stops on my commute route.

  > Scenario: a user visits a route show page

  [] When I visit the show page, I see a list of stops   
  [] When I visit the show page, I can choose an origin and destination stop from the list of stops   

5. As an MBTA commuter,  
I want to be able to select my MBTA route,  
So that I can see predictions for my commute.

  > Scenario: a user visits a route show page

  [] When I visit the show page, I see a prediction for my commute

6. As an MBTA commuter,  
I want to be able to select my MBTA route,  
So that I can save my route to my account.

  > Scenario: a user saves a route to their account

  [] When I visit the show page, I have the option to save a route to my saved trips  
  [] When I save a route, I will get a confirmation alert

7. As an MBTA commuter,  
I want to be able to select my MBTA route,  
So that I can compare my commute time to previous commutes.

  > Scenario: a user visits a route show page

  [] When I visit the show page, I can see times of previous commutes



# TripTrack Bonus User Stories

10. As an MBTA commuter,   
I want to be able to check other transit routes,  
So that I can see how they compare to the average duration.

  > Scenario: a user compares route times

      [] When I select a route, I will be able to see times of recently completed trips   

7. As an MBTA commuter,  
I want to be able to write a comment,  
So that I can see how they compare to the average duration.

  > Scenario: a user leaves a comment

      [] When I am looking at my saved route, I can leave a comment

8. As an MBTA commuter,  
I want to be able to tweet at the MBTA,  
So that I can communicate the state of my commute.

  > Scenario: a user tweets at MBTA

  [] When I click on the tweet button, I will be able to send a tweet to MBTA with information about my commute.

8. As an MBTA commuter,  
I want to be able to see visualized data about my trips,  
So that I can easily understand the trends of my commute.

  > Scenario: a user requests data visualization

    [] When I visit my saved routes, I can see data visualization of the duration of my commutes.


# TripTrack Elevator Pitch

While the MBTA offers the promise of reliable mass transit to much of Massachusetts, the reality is that the service is riddled with pitfalls. Users typically can get to their desired destinations, however timeframes are erratic. For customer commuters nothing is more frustrating than being unable to reliably calculate the length of your daily commute. TripTrack is a tool that will help users understand their commute better, in turn allowing them to take back control of their commute time and plan their lives better. Utilizing the MBTA V3 API and D3 data visualization, TripTrack will give users a depth of analysis never-before-seen in the transit app marketplace. While commuting can seem like an out-of-control roller coaster with no end in sight, now you'll be able to quantify your daily experience so you can optimize your daily schedule and time management.
