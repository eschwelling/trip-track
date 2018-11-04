import React, {Component} from 'react'
import DestinationArrivalTime from './DestinationArrivalTime'

class DestinationPrediction extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.getDestinationPredictions = this.getDestinationPredictions.bind(this)
  }

  getDestinationPredictions(){
    console.log(this.props)
    fetch(`https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${this.props.destinationMbtaId}`)
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
      this.setState({ data: body.data })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let destinationTimes = this.state.data.map(destination => {
          if (destination.attributes.arrival_time !== null && destination.attributes.direction_id == this.props.direction)  {
        return(
          <DestinationArrivalTime
            id={destination.id}
            key={destination.id}
            arrivalTime={destination.attributes.arrival_time}
            departureTime={destination.attributes.departure_time}
            directionId={destination.attributes.direction_id}
            route={destination.relationships.route.data.id}
            stop={destination.relationships.stop.data.id}
            />
        )
      } else {
        swal({
          icon: "error",
          title: "sorry! no available predictions",
          text: "as they say on the MBTA google group: 'Due to the shortcomings of our data collection system, we sometimes miss departures from the first stop of a trip'"
        });
      }
    })
    return(
      <div>
      {destinationTimes}
      <button onClick={this.getDestinationPredictions}>get destination predictions</button>
      </div>
    )
  }
}

export default DestinationPrediction
