import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import BackButton from './BackButton'


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
  const children = React.Children.map(this.props.children, child => {
    return React.cloneElement(child, {
      currentUser: this.state.currentUser
    });
  });
  return(
    <div className="">
          <div className="react-nav-bar">
            <div className="small-4 medium-6 large-6 columns">
              <Link id="nav-button" className="home-button secondary button" to={`/home`}>Home!</Link>
              <a id="signout-button" className="home-button secondary button" href={'/users/sign_out'}>Sign Out!</a>
            </div>
            <div className="small-4 medium-6 large-6 columns">
              <h1 id="headline" className="main-header">TripTrack</h1>
            </div>
        </div>
        {this.props.children}
    </div>
  )
  }
}


export default NavBar;
