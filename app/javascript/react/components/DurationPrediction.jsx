import React, { Component } from 'react'
import DurationPredictionTile from './DurationPredictionTile'
import fetchJson from '../utils/fetchJson'

class DurationPrediction extends Component {
  constructor(props){
    super(props)
    this.state = {
      matchedPredictions: []
    }
    this.fetchArrivalsAndDestinations = this.fetchArrivalsAndDestinations.bind(this)
}


  fetchArrivalsAndDestinations(){
    let endpoints = [`/api/v1/mbta/predictions?stop=${this.props.arrivalMbtaId}`, `/api/v1/mbta/predictions?stop=${this.props.destinationMbtaId}`]

    Promise.all(endpoints.map(fetchJson))
    .then(responses => {
      // Index the destination side by trip id so pairing is one pass over each
      // list instead of comparing every arrival against every destination.
      let destinationsByTripId = new Map(
        responses[1].data.map(destination => [destination.relationships.trip.data.id, destination])
      )

      let matches = []
      responses[0].data.forEach((arrival) => {
        let destination = destinationsByTripId.get(arrival.relationships.trip.data.id)
        if (destination) {
          matches.push({ arrival: arrival, destination: destination })
        }
      })
      this.setState({ matchedPredictions: matches })
      this.saveTrips(matches)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  // Recorded in one request. Each tile used to POST its own trip on mount,
  // so a busy route fired a request per prediction.
  saveTrips(matches) {
    if (matches.length === 0) return

    const trips = matches.map(match => ({
      arrival: match.arrival.attributes.arrival_time,
      departure: match.destination.attributes.arrival_time
    }))

    fetchJson(`/api/v1/journeys/${this.props.id}/trips`, {
      method: 'POST',
      body: JSON.stringify({ trips }),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  componentDidMount() {
    this.fetchArrivalsAndDestinations();
  }

  render(){
    let mappedMatchedPredictions = this.state.matchedPredictions.map(trip => {
        return(
             <DurationPredictionTile
             key={trip.arrival.id}
             arrival={trip.arrival}
             destination={trip.destination}
             />
           )
    })

    return(
      <div>
          <div>
            {mappedMatchedPredictions}
          </div>
      </div>
    )
  }
}


export default DurationPrediction
