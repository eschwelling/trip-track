# TripTrack

TripTrack is an application for tracking MBTA bus trip times and visualizing prediction data.

#### https://trip---track.herokuapp.com/
<br/>
TripTrack is my first web application and was built during my time at Launch Academy as my capstone project. I love that coding gives me the skills to approach everyday problems from a new angle, and I wanted to tackle mass transit as my first independent project. As a frequent bus rider, I've been frustrated by the current system and I built TripTrack to help provide insights into trip durations that could help shape policy to improve mass transit for all.

TripTrack is built using data from the MBTA V3 API and the charts are rendered using React Google Charts. Other dependencies include Carrierwave, React Dropzone, Moment.js, React Router and SweetAlert. The app uses Ruby 3.3, Rails 7.1 and React 18.

### Getting Started

1. Clone the repository to your machine
2. Navigate to the cloned repository
3. Run the following from the command line to install all necessary dependencies:

      `$ bundle install`
      `$ yarn install`

4. Copy `.env.example` to `.env` and fill in an MBTA API key (free, from the [MBTA developer portal](https://api-v3.mbta.com/)). The key is used server-side only; requests from the browser are proxied through the Rails app.

5. Create the database and run migrations

      `$ bin/rails db:create`
      `$ bin/rails db:migrate`

6. Start the Rails server (Vite builds JS on demand in development, no separate process required):

      `$ bin/rails s`

   To run Vite's own dev server for hot module reloading instead, run `bin/vite dev` alongside `bin/rails s`.

7. Navigate to `localhost:3000` in your web browser.

### Test Suite

Ruby/Rails specs (models, controllers, features) run with RSpec:

`$ bundle exec rspec`

React component tests run with Vitest and React Testing Library:

`$ yarn test`

Both suites run in CI on every push and pull request (see `.github/workflows/ci.yml`).

### Frameworks, libraries and gems

* [Rails](https://rubyonrails.org/) 7.1 - Backend framework
* [Devise](https://github.com/heartcombo/devise) - User authentication
* [Vite Ruby](https://vite-ruby.netlify.app/) - JavaScript bundling
* [React](https://react.dev/) 18 - Frontend UI
* [React Router](https://reactrouter.com/) 6 - Client-side routing
* [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) - JS test suite
* [Foundation](https://foundation.zurb.com/) - CSS Framework
* [TurretCSS](https://turretcss.com/) - CSS Framework
* [FontAwesome](https://fontawesome.com/) - Icons
* [Moment.js](https://momentjs.com/) - Parse, manipulate and display times in JavaScript
* [React Google Charts](https://react-google-charts.com/) - React Library for rendering Google Charts
* [SweetAlert](https://sweetalert.js.org/) - React library to replace default alerts

### API
* [MBTA V3 API](https://api-v3.mbta.com/) - Real-time transit data from MBTA, proxied through `Api::V1::MbtaController` so the API key stays server-side.

### Future Plans
* More tests!
* Mobile-friendly layout coming soon!
* TripTrack is optimized for MBTA Bus routes. Future versions will incorporate predictions and data visualization for the T, Commuter Rail and Ferry services.
* Foundation is still pinned to the 5.x series; upgrading to Foundation 6's Sass API and grid system is a separate, purely-visual project.
