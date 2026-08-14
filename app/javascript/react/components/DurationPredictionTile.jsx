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
        <div className="mb-4 bg-tile p-4 text-white sm:p-6">
          <h1 id="duration-prediction-tile" className="font-display text-4xl font-bold sm:text-6xl">{predictedTime} minutes</h1>
          <h2 className="mt-3 text-sm text-gray-300">arrival time at origin:</h2>
            <h1 className="text-2xl sm:text-4xl">{moment(arrivalTime).utcOffset('-0500').format("hh:mm:ss A")}</h1>
          <h2 className="mt-3 text-sm text-gray-300">arrival time at destination:</h2>
            <h1 className="text-2xl sm:text-4xl">{moment(destinationTime).utcOffset('-0500').format("hh:mm:ss A")}</h1>
        </div>
      )
    }
}

export default DurationPredictionTile
