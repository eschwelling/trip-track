import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const NavBar = () => {
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


export default NavBar;
