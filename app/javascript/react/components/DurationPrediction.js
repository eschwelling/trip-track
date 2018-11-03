import React, { Component } from 'react'

class DurationPrediction extends Component {
  constructor(props){
    super(props)
    this.state = {
      arrivals: [],
      destinations: [],
      calculatedDurations: []
    }
    // this.calculateDuration = this.calculateDuration.bind(this)
    this.getArrivalPredictions = this.getArrivalPredictions.bind(this)
    this.getDestinationPredictions = this.getDestinationPredictions.bind(this)
  }

  // calculateDuration() {

  //   let matchedPrediction;
  //       arrivalPredictions.forEach((arrival) => {
  //           destinationPredictions.forEach((destination) => {
  //             if (arrival.relationships.trip.data.id == destination.relationships.trip.data.id) {
  //               debugger;
  //             }
  //           })
  //       })
  // }

  componentDidMount() {
    debugger;
    this.getArrivalPredictions();
    this.getDestinationPredictions();
    debugger;
  }

  getArrivalPredictions(){
    fetch(`https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${this.props.arrivalMbtaId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      debugger;
      this.props.originHandlePayload(body.data)
      this.setState({ arrivals: body.data })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getDestinationPredictions(){
    console.log(this.props)
    fetch(`https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${this.props.destinationMbtaId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      debugger;
      this.props.destinationHandlePayload(body.data)
      this.setState({ destinations: body.data })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    debugger;
    return(
      <div>hi from DurationPredictionTile!</div>
    )
  }
}


export default DurationPrediction
