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
      // Each entry is { mbtaId, name, localId } - the MBTA stop paired with the
      // local Stop record it maps to, resolved once when the route loads.
      stops: [],
      originMbtaId: '',
      destinationMbtaId: '',
      loadingStops: false,
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
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }

  loadStops(directionId, lineId) {
    const requestId = (this.latestStopsRequest += 1)
    this.setState({ loadingStops: true })

    fetchJson(`/api/v1/mbta/stops?direction_id=${directionId}&route=${lineId}`)
      .then((body) => {
        const mbtaStops = body.data || []
        if (mbtaStops.length === 0) return []

        // One request resolves every stop on the route. This replaced a
        // download of the entire stops table per dropdown interaction.
        const ids = mbtaStops.map((stop) => stop.id)
        return fetchJson(`/api/v1/stops?mbta_ids=${encodeURIComponent(ids.join(','))}`).then((localStops) => {
          const localIdByMbtaId = new Map(localStops.map((stop) => [String(stop.mbta_id), stop.id]))
          return mbtaStops.map((stop) => ({
            mbtaId: stop.id,
            name: stop.attributes.name,
            localId: localIdByMbtaId.get(String(stop.id)),
          }))
        })
      })
      .then((stops) => {
        if (requestId !== this.latestStopsRequest) return // superseded by a newer selection

        this.setState({
          stops,
          loadingStops: false,
          originMbtaId: stops.length > 0 ? stops[0].mbtaId : '',
          destinationMbtaId: stops.length > 0 ? stops[stops.length - 1].mbtaId : '',
        })
      })
      .catch((error) => {
        if (requestId !== this.latestStopsRequest) return
        this.setState({ stops: [], loadingStops: false, originMbtaId: '', destinationMbtaId: '' })
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
  chooseOrigin(originMbtaId) {
    this.setState({ originMbtaId })
  }

  chooseDestination(destinationMbtaId) {
    if (String(destinationMbtaId).includes('place')) {
      swal('Data for this stop is not available right now. Sorry! Please choose the next closest stop.')
    }
    this.setState({ destinationMbtaId })
  }

  localStopId(mbtaId) {
    const stop = this.state.stops.find((candidate) => candidate.mbtaId === mbtaId)
    return stop && stop.localId
  }

  handleSubmit(event) {
    event.preventDefault()

    const line = this.state.lines.find((candidate) => candidate.mbta_id === this.state.lineId)
    const origin = this.localStopId(this.state.originMbtaId)
    const destination = this.localStopId(this.state.destinationMbtaId)

    if (!line || !origin || !destination) {
      swal('Hang on!', 'Please choose a line, origin, and destination first.', 'info')
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
    const { lines, lineId, directionId, stops, originMbtaId, destinationMbtaId, loadingStops, saving } = this.state
    const stopOptions = stops.map((stop) => (
      <option key={stop.mbtaId} value={stop.mbtaId}>{stop.name}</option>
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
            value={originMbtaId}
            onChange={this.chooseOrigin}
            disabled={loadingStops}
          >
            {stopOptions}
          </SelectField>

          <SelectField
            label="destination"
            name="destinationStops"
            value={destinationMbtaId}
            onChange={this.chooseDestination}
            disabled={loadingStops}
          >
            {stopOptions}
          </SelectField>

          <input
            id="input-text"
            className="btn mt-6 w-full disabled:opacity-50 sm:w-auto sm:px-8"
            value="Choose Your Commute!"
            type="submit"
            disabled={loadingStops || saving}
          />
        </form>
      </div>
    )
  }
}

export default JourneySelectionForm;
