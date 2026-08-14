import React, { Component } from 'react'
import swal from 'sweetalert';

import LineForm from './LineForm'
import OriginForm from './OriginForm'
import DestinationForm from './DestinationForm'
import DirectionSelector from './DirectionSelector'

class JourneySelectionForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      line_id: "",
      line: {},
      allLines: [],
      origin: "",
      formOrigin: "",
      destination: "",
      formDestination: "",
      originStops: [],
      direction_id: 0,
      loading: false,
      user: {}
    }
    this.chooseLine = this.chooseLine.bind(this)
    this.chooseFormOrigin = this.chooseFormOrigin.bind(this)
    this.chooseFormDestination = this.chooseFormDestination.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.chooseDirection = this.chooseDirection.bind(this)
    this.fetchStopsLineDirectionId = this.fetchStopsLineDirectionId.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/users')
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
        this.setState({ user: body })
      })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

    fetch('/api/v1/lines')
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
      let busLines = body.filter(line => (
        line.description !== "Rapid Transit" &&
        line.description !== "Commuter Rail" &&
        line.description !== "Limited Service" &&
        line.description !== "Ferry"
      ))
      this.setState({ allLines: busLines })
      if (busLines.length > 0) {
        this.setState({ line_id: busLines[0].mbta_id, line: busLines[0] })
        this.fetchStopsLineDirectionId(this.state.direction_id, busLines[0].mbta_id)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchStopsLineDirectionId(direction_id, line_id) {
    fetch(`/api/v1/mbta/stops?direction_id=${direction_id}&route=${line_id}`)
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
      this.setState({ originStops: body.data })
      if (body.data.length > 0) {
        // A select's default option never fires onChange, so commit the
        // first stop to state as the default origin and destination.
        let firstStopId = body.data[0].id
        this.setState({ formOrigin: firstStopId, formDestination: firstStopId })
        this.lookupLocalStop(firstStopId, 'origin')
        this.lookupLocalStop(firstStopId, 'destination')
      } else {
        this.setState({ formOrigin: "", formDestination: "", origin: "", destination: "" })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  lookupLocalStop(mbtaStopId, stateKey) {
    fetch('/api/v1/stops')
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
      let match = body.find(stop => stop.mbta_id == mbtaStopId)
      this.setState({ [stateKey]: match || "", loading: false })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  chooseLine(linePayload) {
    let selectedLine = this.state.allLines.find(line => line.mbta_id == linePayload)
    this.setState({ line_id: linePayload, line: selectedLine || {} })
    this.fetchStopsLineDirectionId(this.state.direction_id, linePayload)
  }

  chooseDirection(directionPayload) {
    this.setState({ direction_id: directionPayload})
    this.fetchStopsLineDirectionId(directionPayload, this.state.line_id)
  }

  chooseFormOrigin(originFormPayload) {
    this.setState({ formOrigin: originFormPayload, loading: true})
    this.lookupLocalStop(originFormPayload, 'origin')
  }

  chooseFormDestination(destinationFormPayload) {
    this.setState({ formDestination: destinationFormPayload, loading: true})
    if (destinationFormPayload.includes('place')) {
      swal("Data for this stop is not available right now. Sorry! Please choose the next closest stop.")
    }
    this.lookupLocalStop(destinationFormPayload, 'destination')
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.line.id || !this.state.origin.id || !this.state.destination.id) {
      swal("Hang on!", "Please choose a line, origin, and destination first.", "info");
      return;
    }
    let journey = {
      line: this.state.line.id,
      origin: this.state.origin.id,
      destination: this.state.destination.id,
      direction: parseInt(this.state.direction_id),
      user: parseInt(this.state.user.id)
    }
    fetch('/api/v1/journeys', {
      method: 'POST',
      body: JSON.stringify(journey),
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
    .then(response => response.json())
    .then(body => {
      this.props.journeyFetch();
      swal("Your commute has been saved!");
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`);
      swal("Save error. Please try again.");
    });
  }

  render() {
    let loading = this.state.loading
    let button;

    if (loading) {
        button = <input id="input-text" className="btn mt-6 w-full disabled:opacity-50 sm:w-auto sm:px-8" value="Choose Your Commute!" type="submit" disabled/>
    } else {
      button = <input id="input-text" className="btn mt-6 w-full sm:w-auto sm:px-8" value="Choose Your Commute!" type="submit"/>
    }

      return(
        <div>
          <h1 className="mb-4 font-display text-2xl font-black sm:text-3xl">Please select your commute</h1>
          <form className="flex flex-col gap-4" onSubmit={this.handleSubmit}>
            <LineForm
              lines={this.state.allLines}
              value={this.state.line_id}
              handlePayload={this.chooseLine}
              />
            <DirectionSelector
              handlePayload={this.chooseDirection}
              />
            <OriginForm
              label="origin"
              handleFormChange={this.chooseFormOrigin}
              stops={this.state.originStops}
              value={this.state.formOrigin}
              />
            <DestinationForm
              label="destination"
              handleFormChange={this.chooseFormDestination}
              stops={this.state.originStops}
              value={this.state.formDestination}
              />
            {button}
          </form>
        </div>
      )
    }
  }

export default JourneySelectionForm;
