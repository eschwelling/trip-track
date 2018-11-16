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
      line_id: "701",
      line: [],
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
  }

  fetchStopsLineDirectionId(direction_id, line_id) {
    fetch(`https://api-v3.mbta.com/stops?api_key=${window.MBTAkey}&filter%5Bdirection_id%5D=${this.state.direction_id}&filter%5Broute%5D=${this.state.line_id}`, {
      headers: {
        'Accept-Encoding': 'gzip'
      }})
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
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  chooseLine(linePayload) {
    event.preventDefault();
    this.setState({ line_id: linePayload})
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
        body.forEach(line => {
        if (line.mbta_id == linePayload)
        this.setState({ line: line })
        this.fetchStopsLineDirectionId(this.state.direction_id, this.state.line)
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.fetchStopsLineDirectionId(this.state.direction_id, this.state.line)
  }

  chooseDirection(directionPayload) {
    event.preventDefault();
    this.setState({ direction_id: directionPayload})
    this.fetchStopsLineDirectionId(this.state.direction_id, this.state.line)
  }

  chooseFormOrigin(originFormPayload) {
    event.preventDefault();
    this.setState({ formOrigin: originFormPayload, loading: true})
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
          body.forEach(stop => {
          if (stop.mbta_id == originFormPayload)
          this.setState({ origin: stop, loading: false })
        })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  chooseFormDestination(destinationFormPayload) {
    event.preventDefault();
    this.setState({ formDestination: destinationFormPayload, loading: true})
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
        if (destinationFormPayload.includes('place'))
        swal("Data for this stop is not available right now. Sorry! Please choose the next closest stop.")

        body.forEach(stop => {
          if (stop.mbta_id == destinationFormPayload)
          this.setState({ destination: stop, loading: false })
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event) {
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
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    swal("Save error. Please try again.");
    event.preventDefault();
  }

  render() {
    let loading = this.state.loading
    let button;

    if (loading) {
        button = <input id="input-text" value="Choose Your Commute!" type="submit" onSubmit={this.handleSubmit} disabled/>
    } else {
      button = <input id="input-text" value="Choose Your Commute!" type="submit" onSubmit={this.handleSubmit}/>
    }

      return(
        <div className="">
        <div className="left small-5 medium-5 columns">
          <div className="train-line-form">
              <h1>Please select your commute</h1>
                <form onSubmit={this.handleSubmit}>
                  <LineForm
                    handlePayload={this.chooseLine}
                    />
                  <DirectionSelector
                    handlePayload={this.chooseDirection}
                    />
                  <OriginForm
                    label="origin"
                    handlePayload={this.chooseOrigin}
                    handleFormChange={this.chooseFormOrigin}
                    stops={this.state.originStops}
                    value={this.state.origin}
                    />
                  <DestinationForm
                    label="destination"
                    handlePayload={this.chooseDestination}
                    handleFormChange={this.chooseFormDestination}
                    stops={this.state.originStops}
                    value={this.state.destination}
                    />
                  {button}
              </form>
          </div>
        </div>
      </div>
      )
    }
  }

export default JourneySelectionForm;
