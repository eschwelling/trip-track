import React, { Component } from "react";
import { Chart } from "react-google-charts";

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
    fetch(`/api/v1/journeys/${this.props.id}/trips`)
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
        let mappedData = body.trips.map(trip => {
          let tripData = []
          let arrival = parseInt(trip.arrival.slice(11).slice(0, -9))
          tripData.push([ arrival, trip.total_trip_time ])
          let newData = this.state.data.concat(tripData)
          this.setState({ data: newData })
        })
      })
    }

      fetchScheduleData(){
        let endpoints = [`https://api-v3.mbta.com/schedules?filter%5Broute%5D=${this.props.line}&filter%5Bstop%5D=${this.props.origin}`, `https://api-v3.mbta.com/schedules?filter%5Broute%5D=${this.props.line}&filter%5Bstop%5D=${this.props.destination}`]

        let promises = endpoints.map((endpoint) => {
          return fetch(endpoint)
        })

        Promise.all(promises).then((responses) =>{
          let parsedResponses = responses.map((response) => {
            return response.json();
          })
          return Promise.all(parsedResponses)
        })
        .then(responses => {
          let matches = []
          responses[0].data.forEach((arrival) => {
            responses[1].data.forEach((destination) => {
              if (arrival.relationships.trip.data.id == destination.relationships.trip.data.id) {

                let arrivalTime = arrival.attributes.arrival_time
                let destinationTime = destination.attributes.arrival_time
                let predictedTime = Math.floor(( new Date(destinationTime) - new Date(arrivalTime))/60000)

                matches.push([predictedTime, parseInt(arrival.attributes.arrival_time.slice(11).slice(0, -9))])
              }
            })
          })
          this.setState({ scheduleData: matches })
        })
      }

    render(){
      if (this.state.scheduleData !== null) {
        return (
          <div>
            <div className="small-6 columns">
              <Chart
              chartType="ScatterChart"
              rows={this.state.data}
              columns={[
                {
                  type: "number",
                  label: "Time"
                },
                {
                  type: "number",
                  label: "Duration"
                }
              ]}
              options={
                {
                  title: "Your Trips",
                  hAxis: {
                    title: "Time of Day",
                    viewWindow: { min: 0, max: 24 }
                  },
                  vAxis: { title: "Length of Trip", viewWindow: { min: 0, max: 60 } },
                  legend: "none"
                }
              }
              width={"100%"}
              height={"400px"}
              legendToggle
              />
            </div>
            <div className="small-6 columns">
              <Chart
                chartType="ScatterChart"
                rows={this.state.scheduleData}
                columns={[
                  {
                    type: "number",
                    label: "Scheduled Time",
                  },
                  {
                    type: "number",
                    label: "Scheduled Duration"
                  }
                ]}
                options={
                  // Chart options
                  {
                    title: "Scheduled Trips",
                    hAxis: {
                      title: "Time of Day",
                      viewWindow: { min: 0, max: 24 }
                    },
                    vAxis: { title: "Length of Trip", viewWindow: { min: 0, max: 60 } },
                    legend: "none"
                  }
                }
                width={"100%"}
                height={"400px"}
                legendToggle
              />
            </div>
          </div>
        );
      }
      return(
          <div className="chart-button small-12 medium-8 large-6 columns">
            <input onClick={this.fetchScheduleData} value="Get Charts" type="submit"/>
          </div>
      )
    }
};
export default JourneyChart;
