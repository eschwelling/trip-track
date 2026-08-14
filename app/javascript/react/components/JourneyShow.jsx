import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
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
  }

  componentDidMount() {
    fetch(`/api/v1/journeys/${this.props.id}`)
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
        let origin = body.journey.origin
        let destination = body.journey.destination
        let presenceOfId = Object.keys(origin).length > 0 || Object.keys(destination).length > 0
        this.setState({ origin, destination, line: body.journey.line, direction: body.journey.direction_id, presenceOfId })
      })
    }

  render() {
      return(
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
          <div className="flex flex-col gap-8 md:flex-row">
            <div id="journey-show-route" className="md:w-1/2">
              <h1 className="text-xl sm:text-2xl">line: <span className="font-display text-mbta">{this.state.line.name}  - {this.state.line.short_name}</span></h1>
              <h1 className="mt-3 text-xl sm:text-2xl">origin: <span className="font-display text-mbta">{this.state.origin.name}</span></h1>
              <h1 className="mt-3 text-xl sm:text-2xl">destination: <span className="font-display text-mbta">{this.state.destination.name}</span></h1>
            </div>

            <div className="md:w-1/2">
                  {
                    this.state.presenceOfId &&
                    <DurationPrediction
                      id={this.props.id}
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

          <div className="mt-8">
            <JourneyChart
              id={this.props.id}
              direction={this.state.direction}
              line={this.state.line.mbta_id}
              destination={this.state.destination.mbta_id}
              origin={this.state.origin.mbta_id}
              />
          </div>

          <div className="mt-8">
            <NoteContainer
              id={this.props.id}
              />
          </div>
        </div>
      )
    }
  }

const JourneyShowWithParams = (props) => {
  const { id } = useParams()
  return <JourneyShow {...props} id={id} />
}

export default JourneyShowWithParams;
