import React, { Component } from "react";
import { Chart } from "react-google-charts";

class ExampleChart extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:[]
    }
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
        console.log(this.state.data)
      })
    }

    render(){
      return (
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
          // Chart options
          {
            title: "Time of Day vs. Length of Trip comparison",
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
      );
    }
};
export default ExampleChart;
