import React, { Component } from 'react'
import swal from 'sweetalert';

import JourneyTile from './JourneyTile'
import JourneySelectionForm from './JourneySelectionForm'
import fetchJson from '../utils/fetchJson'

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
    fetchJson('/api/v1/journeys')
    .then(body => {
      this.setState({ journeys: body.journeys })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteJourney(id) {
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
        fetchJson(`/api/v1/journeys/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' }
        })
        .then(() => {
          let newJourneys = this.state.journeys.filter(journey => journey.id !== id)
          this.setState({journeys: newJourneys})
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`))
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
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 md:flex-row md:gap-0 md:py-10">
          <div className="md:w-1/2 md:pr-8">
            <JourneySelectionForm
              journeyFetch = {this.journeyFetch}
              />
          </div>
          <div className="md:w-1/2 md:border-l md:border-black md:pl-8">
            <h1 id="your-commutes" className="mb-4 font-display text-2xl font-black sm:text-3xl">Your Commutes:</h1>
            <div className="flex flex-col gap-4">
              {journeys}
            </div>
          </div>
        </div>
      )
    }
  }

export default FormMasterComponent;
