import React, { Component } from 'react'
import DepartureTime from './DepartureTime'
import OriginPrediction from './OriginPrediction'
import DestinationPrediction from './DestinationPrediction'
import DurationPrediction from './DurationPrediction'


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
      destinationArrivalPredictions: {},
      presenceOfId: false
    }
    this.idPresenceSwitch = this.idPresenceSwitch.bind(this)
  }

  idPresenceSwitch(){
    if (Object.keys(this.state.destination).length == 0 && Object.keys(this.state.origin).length == 0 && Object.keys(this.state.direction).length == 0) {
      this.setState({ presenceOfId: this.state.presenceOfId})
    } else {
      this.setState({ presenceOfId: !this.state.presenceOfId})
    }
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
        this.idPresenceSwitch();
      })
    }

  render() {
      return(
        <div className="row">
          <div className="small-6 medium-8 large-6 columns predictions-show">
            <h1>origin: <span className="prediction-text">{this.state.origin.name}</span></h1>
            <h1>destination: <span className="prediction-text">{this.state.destination.name}</span> </h1>
            <h1>line: <span className="prediction-text">{this.state.line.name}</span></h1>
          </div>
            <div className="small-6 medium-8 large-6 columns predictions-show">
            <h3>predictions:</h3>
                {
                  this.state.presenceOfId &&
                  <DurationPrediction
                    originHandlePayload = {this.getOriginArrivalTimes}
                    destinationHandlePayload = {this.getDestinationArrivalTimes}
                    arrivalMbtaId = {this.state.origin.mbta_id}
                    destinationMbtaId = {this.state.destination.mbta_id}
                    originArrivalTimes = {this.state.originArrivalPredictions}
                    destinationArrivalTimes = {this.state.destinationArrivalPredictions}
                    />
                }
          </div>
        </div>
      )
    }
  }

export default JourneyShow;
