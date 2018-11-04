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
  // this.mappedMatchedPredictions = []
  // this.fetchArrivals = this.fetchArrivals.bind(this)
  // this.fetchDestinations = this.fetchDestinations.bind(this)
}

  // fetchArrivals(){
  //   fetch(`https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${this.props.arrivalMbtaId}`)
  //   .then(response => {
  //     if (response.ok) {
  //       return response;
  //     } else {
  //       let errorMessage = `${response.status} (${response.statusText})`,
  //       error = new Error(errorMessage);
  //       throw(error);
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(body => {
  //     this.setState({ arrivals: body.data })
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }

  // fetchDestinations(){
  //   fetch(`https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${this.props.destinationMbtaId}`)
  //   .then(response => {
  //     if (response.ok) {
  //       return response;
  //     } else {
  //       let errorMessage = `${response.status} (${response.statusText})`,
  //       error = new Error(errorMessage);
  //       throw(error);
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(newBody => {
  //     this.setState({ destinations: newBody.data })
  //       if (this.state.arrivals !== null && this.state.destinations !== null) {
  //         this.state.arrivals.forEach(arrival => {
  //           this.mappedMatchedPredictions = this.state.destinations.map(destination => {
  //           if (arrival.relationships.trip.data.id == destination.relationships.trip.data.id) {
  //             return(
  //               <DurationPredictionTile
  //               key={arrival.attributes.id}
  //               arrival={arrival}
  //               destination={destination}
  //               />
  //             )
  //           }
  //         })
  //       })
  //         if (typeof mappedMatchedPredictions !== 'undefined'){
  //           let this.mappedMatchedPredictions = this.mappedMatchedPredictions.filter((object) => {
  //             return (object !== undefined)
  //           })
  //         }
  //     }
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }

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
      console.log(responses)
      let matches = []
      responses[0].data.forEach((arrival) => {
        responses[1].data.forEach((destination) => {
          if (arrival.relationships.trip.data.id == destination.relationships.trip.data.id) {
            matches.push({ arrival: arrival, destination: destination })
          }
        })
      })
      console.log(matches)
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
