import React, { Component } from 'react'
import swal from 'sweetalert';

import JourneyTile from './JourneyTile'
import JourneySelectionForm from './JourneySelectionForm'

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
      journeys: [],
      direction_id: 0,
      loading: false,
      user: {}
    }
    this.deleteJourney = this.deleteJourney.bind(this)
    this.journeyFetch = this.journeyFetch.bind(this)
  }

  componentDidMount() {
    this.journeyFetch();
  }

  journeyFetch() {
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

  deleteJourney(id) {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          swal({
            title: "Deleted",
            text: "Done and done!",
            icon: "success"
          });
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
      } else {
        swal("Good call. Have a great trip!");
      }
    });
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
        <JourneySelectionForm
          journeyFetch = {this.journeyFetch}
          />
        <div className="divider medium-2 columns hide-for-small-only">
        </div>
        <div className="small-12 medium-5 columns journey-section">
          <h1 id="your-commutes">Your Commutes:</h1>
            {journeys}
        </div>
    </div>
      )
    }
  }

export default FormMasterComponent;
