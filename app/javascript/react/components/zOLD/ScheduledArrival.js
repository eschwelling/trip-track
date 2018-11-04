import React, {Component} from 'react'

class ScheduledArrival extends Component {
  constructor(props){
    super(props)
    this.state = {
      scheduledArrivals: {}
    }
  }
  componentDidMount(){
    fetch(`https://api-v3.mbta.com/schedules?filter%5Bstop%5D=${this.props.stopid}`)
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
      this.setState({ scheduledArrivals: body })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div>
      hi from ScheduledArrival
      </div>
    )
  }
}

export default ScheduledArrival;
