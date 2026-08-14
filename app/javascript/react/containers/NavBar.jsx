import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';


class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount() {
   fetch('/api/v1/users',
   {
     credentials: 'same-origin'
   })
   .then(response => {
     if (response.ok) {
       return response;
     } else {
       let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
       throw error;
     }
   })
   .then(response => response.json())
   .then(data => {
     if (data) {
       this.setState({ currentUser: data.user });
     } else {
       this.setState({ currentUser: null });
     }
   })
   .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 render() {
  return(
    <div className="">
          <div className="react-nav-bar">
            <div className="small-4 medium-6 large-6 columns">
              <Link id="nav-button" className="home-button button button-pill" to={`/home`}>Home!</Link>
              <a id="signout-button" className="home-button button button-pill" href={'/users/sign_out'}>Sign Out!</a>
            </div>
            <div className="small-4 medium-6 large-6 columns">
              <h1 id="headline" className="main-header">TripTrack</h1>
            </div>
        </div>
        <Outlet />
    </div>
  )
  }
}


export default NavBar;
