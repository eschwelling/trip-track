import React, { Component } from 'react'
import OriginPrediction from './OriginPrediction'
import DestinationPrediction from './DestinationPrediction'
import DurationPrediction from './DurationPrediction'
import NoteContainer from './NoteContainer'
import JourneyChart from './JourneyChart'



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
        <div>
          <div className="row">
            <div id="journey-show-route" className="small-12 medium-6 large-6 columns">
              <h1>line: <span className="prediction-text">{this.state.line.name}  - {this.state.line.short_name}</span></h1>
              <h1>origin: <span className="prediction-text">{this.state.origin.name}</span></h1>
              <h1>destination: <span className="prediction-text">{this.state.destination.name}</span></h1>
            </div>

            <div className="small-12 medium-6 large-6 columns">
              <div className="predictions-show-master">
                  {
                    this.state.presenceOfId &&
                    <DurationPrediction
                      id={this.props.params.id}
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
        </div>


          <div>
            <div className="row">
              <JourneyChart
                id={this.props.params.id}
                direction={this.state.direction}
                line={this.state.line.mbta_id}
                destination={this.state.destination.mbta_id}
                origin={this.state.origin.mbta_id}
                />
            </div>
          </div>
            <div className="row">
              <div className="small-10 medium-12 large-12 columns notes">
                <NoteContainer
                  id={this.props.params.id}
                  />
              </div>
            </div>
        </div>
      )
    }
  }

export default JourneyShow;
