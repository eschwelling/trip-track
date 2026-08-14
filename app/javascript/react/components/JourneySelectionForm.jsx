import React, { Component } from 'react'
import swal from 'sweetalert'

import SelectField from './SelectField'
import fetchJson from '../utils/fetchJson'

const DIRECTIONS = [
  { id: '0', label: 'Inbound' },
  { id: '1', label: 'Outbound' },
]

class JourneySelectionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lines: [],
      lineId: '',
      directionId: '0',
      // Local Stop records for the selected route: { id, name }. The server
      // resolves MBTA ids to these, so every option here can be saved.
      stops: [],
      originStopId: '',
      destinationStopId: '',
      // Loading starts immediately on mount, so the form stays disabled rather
      // than letting a fast click submit before there is anything to submit.
      loadingStops: true,
      stopsError: false,
      saving: false,
    }

    // Selections can change faster than the stop requests resolve; only the
    // newest request is allowed to write to state.
    this.latestStopsRequest = 0

    this.chooseLine = this.chooseLine.bind(this)
    this.chooseDirection = this.chooseDirection.bind(this)
    this.chooseOrigin = this.chooseOrigin.bind(this)
    this.chooseDestination = this.chooseDestination.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // bus_only lets the server drop the routes this picker never shows.
    fetchJson('/api/v1/lines?bus_only=true')
      .then((lines) => {
        this.setState({ lines })
        if (lines.length > 0) {
          this.setState({ lineId: lines[0].mbta_id })
          this.loadStops(this.state.directionId, lines[0].mbta_id)
        } else {
          this.setState({ loadingStops: false })
        }
      })
      .catch((error) => {
        this.setState({ loadingStops: false, stopsError: true })
        console.error(`Error in fetch: ${error.message}`)
      })
  }

  loadStops(directionId, lineId) {
    const requestId = (this.latestStopsRequest += 1)
    this.setState({ loadingStops: true, stopsError: false })

    // A single request returns the route's stops already resolved to local
    // records, so there is nothing left to look up per selection.
    fetchJson(`/api/v1/mbta/stops?direction_id=${directionId}&route=${lineId}`)
      .then((body) => {
        if (requestId !== this.latestStopsRequest) return // superseded by a newer selection

        const stops = body.stops || []
        this.setState({
          stops,
          loadingStops: false,
          stopsError: false,
          originStopId: stops.length > 0 ? String(stops[0].id) : '',
          destinationStopId: stops.length > 0 ? String(stops[stops.length - 1].id) : '',
        })
      })
      .catch((error) => {
        if (requestId !== this.latestStopsRequest) return
        this.setState({ stops: [], loadingStops: false, stopsError: true, originStopId: '', destinationStopId: '' })
        console.error(`Error in fetch: ${error.message}`)
      })
  }

  chooseLine(lineId) {
    this.setState({ lineId })
    this.loadStops(this.state.directionId, lineId)
  }

  chooseDirection(directionId) {
    this.setState({ directionId })
    this.loadStops(directionId, this.state.lineId)
  }

  // Origin and destination are already loaded, so picking one is just state.
  chooseOrigin(originStopId) {
    this.setState({ originStopId })
  }

  chooseDestination(destinationStopId) {
    this.setState({ destinationStopId })
  }

  handleSubmit(event) {
    event.preventDefault()

    const line = this.state.lines.find((candidate) => candidate.mbta_id === this.state.lineId)
    const origin = parseInt(this.state.originStopId, 10)
    const destination = parseInt(this.state.destinationStopId, 10)

    if (!line || !origin || !destination) {
      swal(
        "We're not ready yet",
        'This route\'s stops are still loading (or could not be loaded). Give it a moment and try again.',
        'info'
      )
      return
    }

    this.setState({ saving: true })

    fetchJson('/api/v1/journeys', {
      method: 'POST',
      body: JSON.stringify({
        line: line.id,
        origin,
        destination,
        direction: parseInt(this.state.directionId, 10),
      }),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .then(() => {
        this.setState({ saving: false })
        this.props.journeyFetch()
        swal('Your commute has been saved!')
      })
      .catch((error) => {
        this.setState({ saving: false })
        console.error(`Error in fetch: ${error.message}`)
        swal('Save error. Please try again.')
      })
  }

  render() {
    const { lines, lineId, directionId, stops, originStopId, destinationStopId, loadingStops, stopsError, saving } = this.state
    const stopOptions = stops.map((stop) => (
      <option key={stop.id} value={stop.id}>{stop.name}</option>
    ))

    return (
      <div>
        <h1 className="mb-4 font-display text-2xl font-black sm:text-3xl">Please select your commute</h1>
        <form className="flex flex-col gap-4" onSubmit={this.handleSubmit}>
          <SelectField label="line" name="line" value={lineId} onChange={this.chooseLine}>
            {lines.map((line) => (
              <option key={line.id} value={line.mbta_id}>
                {line.name} - {line.description} - {line.short_name}
              </option>
            ))}
          </SelectField>

          <SelectField label="direction" name="directionMenu" value={directionId} onChange={this.chooseDirection}>
            {DIRECTIONS.map((direction) => (
              <option key={direction.id} value={direction.id}>{direction.label}</option>
            ))}
          </SelectField>

          <SelectField
            label="origin"
            name="originStops"
            value={originStopId}
            onChange={this.chooseOrigin}
            disabled={loadingStops}
          >
            {stopOptions}
          </SelectField>

          <SelectField
            label="destination"
            name="destinationStops"
            value={destinationStopId}
            onChange={this.chooseDestination}
            disabled={loadingStops}
          >
            {stopOptions}
          </SelectField>

          {stopsError &&
            <p role="alert" className="text-sm text-red-700">
              Couldn&apos;t load stops for this route. Please try again in a moment.
            </p>
          }

          <input
            id="input-text"
            className="btn mt-6 w-full disabled:opacity-50 sm:w-auto sm:px-8"
            value="Choose Your Commute!"
            type="submit"
            disabled={loadingStops || saving || stops.length === 0}
          />
        </form>
      </div>
    )
  }
}

export default JourneySelectionForm;
