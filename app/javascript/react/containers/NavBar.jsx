import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const NavBar = () => {
  return(
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 flex items-center justify-between gap-2 bg-mbta-nav px-3 py-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link id="nav-button" className="btn bg-white !text-mbta hover:bg-gray-100" to={`/home`}>Home!</Link>
          <a id="signout-button" className="btn bg-white !text-mbta hover:bg-gray-100" href={'/users/sign_out'}>Sign Out!</a>
        </div>
        <h1 id="headline" className="font-display text-2xl font-black text-white sm:text-3xl">TripTrack</h1>
      </div>
      <Outlet />
    </div>
  )
}


export default NavBar;
