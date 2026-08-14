import React, { Component } from "react";
import { Chart } from "react-google-charts";
import fetchJson from '../utils/fetchJson'

class JourneyChart extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:[],
      scheduleData: null
    }
    this.fetchScheduleData = this.fetchScheduleData.bind(this)
  }

  componentDidMount() {
    fetchJson(`/api/v1/journeys/${this.props.id}/trips`)
      .then(body => {
        let mappedData = body.trips.map(trip => {
          let arrival = parseInt(trip.arrival.slice(11).slice(0, -9))
          return [ arrival, trip.total_trip_time ]
        })
        this.setState({ data: mappedData })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }

      fetchScheduleData(){
        let endpoints = [`/api/v1/mbta/schedules?route=${this.props.line}&stop=${this.props.origin}`, `/api/v1/mbta/schedules?route=${this.props.line}&stop=${this.props.destination}`]

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

            matches.push([predictedTime, parseInt(arrivalTime.slice(11).slice(0, -9))])
          })
          this.setState({ scheduleData: matches })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`))
      }

    render(){
      if (this.state.scheduleData !== null) {
        return (
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-1/2">
              <Chart
              chartType="ScatterChart"
              data={[["Time", "Duration"], ...this.state.data]}
              options={
                {
                  title: "Your Trips",
                  hAxis: {
                    title: "Time of Day (military time)",
                    viewWindow: { min: 0, max: 24 }
                  },
                  vAxis: { title: "Length of Trip (in minutes)", viewWindow: { min: 0, max: 60 } },
                  legend: "none"
                }
              }
              width={"100%"}
              height={"400px"}
              />
            </div>
            <div className="lg:w-1/2">
              <Chart
                chartType="ScatterChart"
                data={[["Scheduled Time", "Scheduled Duration"], ...this.state.scheduleData]}
                options={
                  {
                    title: "Scheduled Trips",
                    hAxis: {
                      title: "Time of Day (military time)",
                      viewWindow: { min: 0, max: 24 }
                    },
                    vAxis: { title: "Length of Trip (in minutes)", viewWindow: { min: 0, max: 60 } },
                    legend: "none"
                  }
                }
                width={"100%"}
                height={"400px"}
              />
            </div>
          </div>
        );
      }
      return(
          <div className="text-center">
            <input className="btn w-full sm:w-auto sm:px-8" onClick={this.fetchScheduleData} value="Get Charts" type="submit"/>
          </div>
      )
    }
};
export default JourneyChart;
