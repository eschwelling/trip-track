import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import BackButton from './BackButton'


class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {}
    }
    this.userSignOut = this.userSignOut.bind(this);
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

  userSignOut(event) {
   fetch('/users/sign_out',
   {
     method: 'DELETE',
     credentials: 'same-origin',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
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
   .then(response => {
     this.setState({ currentUser: null });
   })
   .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 render() {
  const children = React.Children.map(this.props.children, child => {
    return React.cloneElement(child, {
      currentUser: this.state.currentUser
    });
  });

  if (!this.state.currentUser) {
    return(
      <div>
        <div className="react-nav-bar">
          <Link className="home-button button button-pill" to={`/home`}>Home!</Link>
          <Link className="home-button button button-pill" to={'/'} onClick={this.userSignOut}>Sign Out!</Link>
          <h1 className="main-header">TripTrack</h1>
        </div>
        {this.props.children}
      </div>
    )
  } else {
    return(
      <div>
        <div className="react-nav-bar">
          <Link className="home-button button button-pill" to={`/home`}>Home!</Link>
          <a className="home-button button button-pill" href={`/users/sign_in`}>Sign In!</a>
          <a className="home-button button button-pill" href={`/users/sign_up`}>Sign Up!</a>
          <h1 className="main-header">TripTrack</h1>
        </div>
        {this.props.children}
      </div>
    )
  }

  }
  }


export default NavBar;
