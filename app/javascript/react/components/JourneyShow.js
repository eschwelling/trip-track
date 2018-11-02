import React, { Component } from 'react'
import DepartureTime from './DepartureTime'
import OriginPrediction from './OriginPrediction'
import DestinationPrediction from './DestinationPrediction'
import DurationPredictionTile from './DurationPredictionTile'


class JourneyShow extends Component {
  constructor(props){
    super(props)
    this.state = {
      destination: {},
      origin: {},
      line: {},
      direction: "",
      departureTime: "",
      originArrivalPredictions: {},
      destinationArrivalPredictions: {}
    }
    this.getOriginArrivalTimes = this.getOriginArrivalTimes.bind(this)
    this.getDestinationArrivalTimes = this.getDestinationArrivalTimes.bind(this)
  }

  getOriginArrivalTimes(payload){
    this.setState({ originArrivalPredictions: payload })
  }

  getDestinationArrivalTimes(payload){
    this.setState({ destinationArrivalPredictions: payload })
  }

  componentDidMount() {
    fetch(`/api/v1/journeys/${this.props.params.id}`)
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
        this.setState({ origin: body.journey.origin, destination: body.journey.destination, line: body.journey.line, direction: body.journey.direction_id })
        console.log(this.state)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
        <div className="text-center">
          <h1>origin: {this.state.origin.name}</h1>
          <h1>destination: {this.state.destination.name}</h1>
          <h1>line: {this.state.line.name}</h1>

          <OriginPrediction
            handlePayload = {this.getOriginArrivalTimes}
            arrivalMbtaId = {this.state.origin.mbta_id}
            lineId = {this.state.line.short_name}
            direction = {this.state.direction}
            />
          <DestinationPrediction
            handlePayload = {this.getDestinationArrivalTimes}
            destinationMbtaId = {this.state.destination.mbta_id}
            lineId = {this.state.line.short_name}
            direction = {this.state.direction}
            />
          <DurationPredictionTile
            originArrivalTimes = {this.state.originArrivalPredictions}
            destinationArrivalTimes = {this.state.destinationArrivalPredictions}
            />
        </div>
    )
  }
}

export default JourneyShow;
