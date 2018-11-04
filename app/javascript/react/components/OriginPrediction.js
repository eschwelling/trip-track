import React, {Component} from 'react'
import OriginArrivalTime from './OriginArrivalTime'

class OriginPrediction extends Component {
  constructor(props){
    super(props);
    this.state = {
      arrivals: []
    }
    this.getArrivalPredictions = this.getArrivalPredictions.bind(this)
  }

  getArrivalPredictions(){
    fetch(`https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${this.props.arrivalMbtaId}`)
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
      this.props.handlePayload(body.data)
      this.setState({ arrivals: body.data })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let arrivalTimes = this.state.arrivals.map(arrival => {
      if (arrival.attributes.arrival_time !== null && arrival.attributes.direction_id == this.props.direction) {
        return(
          <OriginArrivalTime
            id={arrival.id}
            key={arrival.id}
            arrivalTime={arrival.attributes.arrival_time}
            departureTime={arrival.attributes.departure_time}
            directionId={arrival.attributes.direction_id}
            route={arrival.relationships.route.data.id}
            stop={arrival.relationships.stop.data.id}
            />
        )
      } else {
        swal({
          icon: "error",
          title: "COMPLETE DATA UNAVAILABLE AT THIS TIME :(",
          text: "as they say on the MBTA google group: 'Due to the shortcomings of our data collection system, we sometimes miss departures from the first stop of a trip'"
        });
      }
    })
    return(
      <div>
      {arrivalTimes}
      <button onClick={this.getArrivalPredictions}>get arrival predictions</button>
      </div>
    )
  }
}

export default OriginPrediction
