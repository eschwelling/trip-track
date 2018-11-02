import React, { Component } from 'react'
import swal from 'sweetalert';

import LineForm from './LineForm'
import OriginForm from './OriginForm'
import DestinationForm from './DestinationForm'
import JourneyTile from './JourneyTile'
import DirectionSelector from './DirectionSelector'

class FormMasterComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      line: [],
      origin: "",
      formOrigin: "",
      destination: "",
      formDestination: "",
      originStops: [],
      destinationStops: [],
      journeys: [],
      direction_id: null,
      error: ""
    }
    this.chooseLine = this.chooseLine.bind(this)
    this.chooseOrigin = this.chooseOrigin.bind(this)
    this.chooseFormOrigin = this.chooseFormOrigin.bind(this)
    this.chooseDestination = this.chooseDestination.bind(this)
    this.chooseFormDestination = this.chooseFormDestination.bind(this)
    this.masterButton = this.masterButton.bind(this)
    this.chooseDirection = this.chooseDirection.bind(this)
    this.deleteJourney = this.deleteJourney.bind(this)
  }


  // after selecting a inbound direction_id
  // originStops state is still there, but we have logic in render that has filtered out all of the outbout stops and passes those stops to the OriginForm

  componentDidMount() {
    fetch(`/api/v1/journeys`)
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
      this.setState({ journeys: body.journeys })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  chooseLine(linePayload) {
    event.preventDefault();
    this.setState({ line: linePayload})
  }

  chooseDirection(directionPayload) {
    event.preventDefault();
    this.setState({ direction_id: directionPayload})
  }

  chooseOrigin(originPayload) {
    event.preventDefault();
    this.fetchStops(originPayload, "originStops")
    this.setState({ origin: originPayload})
  }

  chooseFormOrigin(originFormPayload) {
    event.preventDefault();
    this.setState({ formOrigin: originFormPayload})
  }

  chooseDestination(destinationPayload) {
    event.preventDefault();
    this.fetchStops(destinationPayload, "destinationStops")
    this.setState({ destination: destinationPayload})
  }

  chooseFormDestination(destinationFormPayload) {
    event.preventDefault();
    this.setState({ formDestination: destinationFormPayload})
  }

  masterButton(event) {
    let journey = {
      line: parseInt(this.state.line),
      origin: parseInt(this.state.formOrigin),
      destination: parseInt(this.state.formDestination),
      direction: parseInt(this.state.direction_id),
      user: parseInt(this.props.params.id)
    }
    debugger;
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
      debugger;
      let newJourneys = this.state.journeys.concat(body.journey)
      this.setState({ journeys: newJourneys})
      swal("Your commute has been saved!");
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    swal("Error! Try Again!");
    event.preventDefault();
  }

  fetchStops(query, stopArray) {
    fetch(`/api/v1/stops/search?search_string=${query}`)
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
      this.setState({ [stopArray]: body })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteJourney(id) {
    event.preventDefault();
    fetch(`/api/v1/journeys/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      if(body.error) {
        throw body.error
      } else {
        let newJourneys = this.state.journeys.filter(journey => {
          return(
            journey.id !== id
          )
        })
        this.setState({journeys: newJourneys})
      }
    })
    .catch(error => {
      this.setState({error: error})
      console.log("ERROR in FETCH")
    })
  }



  render() {

    let journeys = this.state.journeys.map(journey => {
      let handleDelete = () => {
        this.deleteJourney(journey.id)
      }

      return(
        <JourneyTile
          line = {journey.line}
          origin = {journey.origin}
          destination = {journey.destination}
          id = {journey.id}
          key = {journey.id}
          direction = {this.state.direction}
          handleDelete = {handleDelete}
          />
      )
    })
    return(
      <div>
        <div className="train-line-form">
          <div className="rows columns">
            <h1>Please select your commute</h1>
            <form onSubmit={this.masterButton}>
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
                stops={this.state.destinationStops}
                value={this.state.destination}
                />
              <input value="Choose Your Commute!" type="submit" onSubmit={this.masterButton}/>
          </form>
          </div>
        </div>
        <h3>Your Commutes:</h3>
          {journeys}
    </div>
    )
  }
}
export default FormMasterComponent;
