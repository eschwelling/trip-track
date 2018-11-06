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
      line_id: "701",
      line: [],
      origin: "",
      formOrigin: "",
      destination: "",
      formDestination: "",
      originStops: [],
      destinationStops: [],
      journeys: [],
      direction_id: 0,
      error: "",
      loading: false,
      user: {}
    }
    this.chooseLine = this.chooseLine.bind(this)
    this.chooseFormOrigin = this.chooseFormOrigin.bind(this)
    this.chooseFormDestination = this.chooseFormDestination.bind(this)
    this.masterButton = this.masterButton.bind(this)
    this.chooseDirection = this.chooseDirection.bind(this)
    this.deleteJourney = this.deleteJourney.bind(this)
    this.fetchStopsLineDirectionId = this.fetchStopsLineDirectionId.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
  }

  componentDidMount() {
    this.fetchUser();
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
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  chooseDirection(directionPayload) {
    event.preventDefault();
    this.setState({ direction_id: directionPayload})
    this.fetchStopsLineDirectionId(this.state.direction_id, this.state.line)
  }

  chooseFormOrigin(originFormPayload) {
    event.preventDefault();
    this.setState({ formOrigin: originFormPayload})
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
        this.setState({ origin: stop })
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  chooseFormDestination(destinationFormPayload) {
    debugger;
    event.preventDefault();
    this.setState({ formDestination: destinationFormPayload})
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
      debugger;
        body.forEach(stop => {
        if (stop.mbta_id == destinationFormPayload)
        this.setState({ destination: stop })
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchUser(){
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

  masterButton(event) {
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
      let newJourneys = this.state.journeys.concat(body.journey)
      this.setState({ journeys: newJourneys})
      swal("Your commute has been saved!");
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    swal("You screwed up man!");
    event.preventDefault();
  }

  fetchStopsLineDirectionId(direction_id, line_id) {
    fetch(`https://api-v3.mbta.com/stops?filter%5Bdirection_id%5D=${this.state.direction_id}&filter%5Broute%5D=${this.state.line_id}`)
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
      <div className="row">
      <div className="left small-5 medium-4 columns">
        <div className="train-line-form">
          <div className="rows">
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
                  stops={this.state.originStops}
                  value={this.state.destination}
                  />
                <input className="success button button-block commute-chooser" value="Choose Your Commute!" type="submit" onSubmit={this.masterButton}/>
            </form>
          </div>
        </div>
      </div>
      <div className="divider small-2 medium-4 columns">
      </div>
      <div className="small-5 medium-4 columns journey-section">
        <h1 id="your-commutes">Your Commutes:</h1>
          {journeys}
      </div>
  </div>
    )
  }
}
export default FormMasterComponent;
