# TripTrack

TripTrack is an application for tracking MBTA bus trip times and visualizing prediction data.

#### https://trip---track.herokuapp.com/
<br/>
TripTrack is my first web application and was built during my time at Launch Academy as my capstone project. I love that coding gives me the skills to approach everyday problems from a new angle, and I wanted to tackle mass transit as my first independent project. As a frequent bus rider, I've been frustrated by the current system and I built TripTrack to help provide insights into trip durations that could help shape policy to improve mass transit for all.

TripTrack is built using data from the MBTA V3 API and the charts are rendered using React Google Charts. Other dependencies include Carrierwave, React Dropzone, Moment.js, React Router and SweetAlert. The app uses Ruby version 2.4.5 and React 15.4.2.

### Getting Started

1. Clone the repository to your machine
2. Navigate to the cloned repository
3. Run the following from the command line to install all necessary dependencies:

      `$ bundle install`      
      `$ yarn install`

4. Create the database and run migrations

      `$ bundle exec rake db:create`  
      `$ bundle exec rake db:migrate`
5. Start the rails server and webpack server

      `$ rails s`   
      `$ yarn start`

6. Navigate to `localhost:3000` in your web browser. Google Chrome is recommended.

### Test Suite

To run RSpec test, please run from the command line:

`$ bundle exec rspec`

The test suite consists of Model and Controller tests. Feature tests and Enzyme tests coming soon.

### Frameworks, libraries and gems

* [Devise](https://github.com/plataformatec/devise) - User authentication
* [Foundation](https://foundation.zurb.com/) - CSS Framework
* [TurretCSS](https://turretcss.com/) - CSS Framework
* [FontAwesome](https://fontawesome.com/) - Icons
* [MakeItSo](https://github.com/LaunchAcademy/make_it_so) - Ruby gem for quick project set-up
* [Moment.js](https://momentjs.com/) - Parse, manipulate and display times in JavaScript
* [React Google Charts](https://react-google-charts.com/) - React Library for rendering Google Charts
* [SweetAlert](https://sweetalert.js.org/) - React library to replace default alerts

### API
* [MBTA V3 API](https://api-v3.mbta.com/) - Real-Time transit data from MBTA

### Future Plans
* More tests!
* Mobile-friendly layout coming soon!
* TripTrack is optimized for MBTA Bus routes. Future versions will incorporate predictions and data visualization for the T, Commuter Rail and Ferry services.
* As of Fall 2018, the MBTA is transitioning their real-time data collection to [Swiftly](https://www.goswift.ly/). To stay current with the latest tracking technology, my goal is to overhaul the prediction data and transition from the MBTA V3 API to Swiftly in the coming year. Stay tuned!
