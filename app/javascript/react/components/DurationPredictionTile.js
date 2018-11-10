import React, { Component } from 'react'
import moment from 'moment';


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
    }

    componentDidMount(){
        this.saveTrips();
    }
    render() {

      let arrivalTime = this.props.arrival.attributes.arrival_time
      let destinationTime = this.props.destination.attributes.arrival_time
      let convertedArrivalTime = moment(arrivalTime)

      let predictedTime = Math.floor(( new Date(destinationTime) - new Date(arrivalTime))/60000)
      return(
        <div className="prediction-tile-master">
          <h1 id="duration-prediction-tile">{predictedTime} minutes</h1>
          <h2>arrival time at origin: </h2>
            <h1 id="prediction-tile-subheader">{moment(arrivalTime).utcOffset('-0500').format("hh:mm:ss A")}</h1>
          <h2>arrival time at destination:</h2>
            <h1  id="prediction-tile-subheader">{moment(destinationTime).utcOffset('-0500').format("hh:mm:ss A")}</h1>
        </div>
      )
    }
}

export default DurationPredictionTile
