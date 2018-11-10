import React, { Component } from 'react'
import DurationPredictionTile from './DurationPredictionTile'

class DurationPrediction extends Component {
  constructor(props){
    super(props)
    this.state = {
      arrivals: [],
      destinations: [],
      matchedPredictions: []
    }
    this.fetchArrivalsAndDestinations = this.fetchArrivalsAndDestinations.bind(this)
}


  fetchArrivalsAndDestinations(){
    let endpoints = [`https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${this.props.arrivalMbtaId}`, `https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${this.props.destinationMbtaId}`]

    let promises = endpoints.map((endpoint) => {
      return fetch(endpoint)
    })

    Promise.all(promises).then((responses) =>{
      let parsedResponses = responses.map((response) => {
        return response.json();
      })
      return Promise.all(parsedResponses)
    })
    .then(responses => {
      let matches = []
      responses[0].data.forEach((arrival) => {
        responses[1].data.forEach((destination) => {
          if (arrival.relationships.trip.data.id == destination.relationships.trip.data.id) {
            matches.push({ arrival: arrival, destination: destination })
          }
        })
      })
      this.setState({ matchedPredictions: matches })
    })
  }

  componentDidMount() {
    this.fetchArrivalsAndDestinations();
  }

  render(){
    let mappedMatchedPredictions = this.state.matchedPredictions.map(trip => {
        return(
             <DurationPredictionTile
             id={this.props.id}
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
