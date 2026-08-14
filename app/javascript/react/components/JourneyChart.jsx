import React, { Component } from "react";
import { Chart } from "react-google-charts";
import fetchJson from '../utils/fetchJson'

const CHART_OPTIONS = (title) => ({
  title: title,
  hAxis: {
    title: "Time of Day (military time)",
    viewWindow: { min: 0, max: 24 }
  },
  vAxis: { title: "Length of Trip (in minutes)", viewWindow: { min: 0, max: 60 } },
  legend: "none"
})

// Google Charts infers column types from the rows, so a header-only array (no
// trips recorded, or no schedule matches) made it throw instead of drawing an
// empty plot. Rows carrying null or NaN - which legacy trips with non-ISO times
// produce - broke it the same way, so those are dropped here.
const plottableRows = (rows) => rows.filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y))

const hourOf = (timestamp) => parseInt(String(timestamp).slice(11).slice(0, -9), 10)

class JourneyChart extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:[],
      scheduleData: null,
      loadingSchedule: false
    }
    this.fetchScheduleData = this.fetchScheduleData.bind(this)
  }

  componentDidMount() {
    fetchJson(`/api/v1/journeys/${this.props.id}/trips`)
      .then(body => {
        let mappedData = body.trips.map(trip => [hourOf(trip.arrival), trip.total_trip_time])
        this.setState({ data: plottableRows(mappedData) })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }

      fetchScheduleData(){
        let endpoints = [`/api/v1/mbta/schedules?route=${this.props.line}&stop=${this.props.origin}`, `/api/v1/mbta/schedules?route=${this.props.line}&stop=${this.props.destination}`]

        this.setState({ loadingSchedule: true })

        Promise.all(endpoints.map(fetchJson))
        .then(responses => {
          // Index the destination side by trip id so pairing is one pass over
          // each list instead of comparing every arrival against every
          // destination.
          let destinationsByTripId = new Map(
            responses[1].data.map(destination => [destination.relationships.trip.data.id, destination])
          )

          let matches = []
          responses[0].data.forEach((arrival) => {
            let destination = destinationsByTripId.get(arrival.relationships.trip.data.id)
            if (!destination) return

            let arrivalTime = arrival.attributes.arrival_time
            let destinationTime = destination.attributes.arrival_time
            let predictedTime = Math.floor(( new Date(destinationTime) - new Date(arrivalTime))/60000)

            matches.push([hourOf(arrivalTime), predictedTime])
          })
          this.setState({ scheduleData: plottableRows(matches), loadingSchedule: false })
        })
        .catch(error => {
          this.setState({ scheduleData: [], loadingSchedule: false })
          console.error(`Error in fetch: ${error.message}`)
        })
      }

    renderChart(title, xLabel, yLabel, rows) {
      if (rows.length === 0) {
        return (
          <p className="py-16 text-center text-sm text-gray-600">
            No data available for “{title}” yet.
          </p>
        )
      }

      return (
        <Chart
          chartType="ScatterChart"
          data={[
            [{ label: xLabel, type: "number" }, { label: yLabel, type: "number" }],
            ...rows
          ]}
          options={CHART_OPTIONS(title)}
          width={"100%"}
          height={"400px"}
        />
      )
    }

    render(){
      if (this.state.scheduleData !== null) {
        return (
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-1/2">
              {this.renderChart("Your Trips", "Time", "Duration", this.state.data)}
            </div>
            <div className="lg:w-1/2">
              {this.renderChart("Scheduled Trips", "Scheduled Time", "Scheduled Duration", this.state.scheduleData)}
            </div>
          </div>
        );
      }
      return(
          <div className="text-center">
            <input
              className="btn w-full disabled:opacity-50 sm:w-auto sm:px-8"
              onClick={this.fetchScheduleData}
              value={this.state.loadingSchedule ? "Loading…" : "Get Charts"}
              type="submit"
              disabled={this.state.loadingSchedule}
            />
          </div>
      )
    }
};
export default JourneyChart;
