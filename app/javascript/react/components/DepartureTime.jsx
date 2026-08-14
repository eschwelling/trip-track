import React, { Component } from 'react'

class DepartureTime extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.props.handlePayload(event.target.value)
  }

  render(){
    return(
      <div className="small-6 columns">
        <form>
          <label>Enter Departure Time:</label>
          <input value={this.props.value} onChange={this.handleChange} type="text"/>
            <input value="Enter" type="submit"/>
        </form>
      </div>
    )
  }
}

export default DepartureTime;
