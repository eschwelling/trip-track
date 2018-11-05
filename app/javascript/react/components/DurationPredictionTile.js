import React, { Component } from 'react'

class DurationPredictionTile extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.saveTrips = this.saveTrips.bind(this)
  }

    saveTrips() {
      let trip = {
        journey: parseInt(this.props.id),
        arrival: this.props.arrival.attributes.arrival_time,
        departure: this.props.destination.attributes.arrival_time
      }
      fetch(`/api/v1/journeys/${trip.journey}/trips`, {
        method: 'POST',
        body: JSON.stringify(trip),
        headers: {
          'Accept':  'application/json',
          'Content-Type': 'application/json'},
        credentials: 'same-origin'
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      event.preventDefault();
    }

    componentDidMount(){
      this.saveTrips();
    }
    render() {
      let arrivalTime = this.props.arrival.attributes.arrival_time
      let destinationTime = this.props.destination.attributes.arrival_time

      let predictedTime = Math.floor(( new Date(destinationTime) - new Date(arrivalTime))/60000)
      return(
        <div>
          <h2>the next trip will take: {predictedTime} minutes</h2>
          <h5>arrival time at origin: {arrivalTime} </h5>
          <h5>arrival time at destination: {destinationTime}</h5>
        </div>
      )
    }
}

export default DurationPredictionTile
