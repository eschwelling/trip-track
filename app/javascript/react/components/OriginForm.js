import React, { Component } from 'react'


class OriginForm extends Component {
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleChange(event) {
    this.props.handlePayload(event.target.value)
  }

  handleFormChange(event) {

    this.props.handleFormChange(event.target.value)
  }

    render(){
      let stopOptions = this.props.stops.map(stop => {
        return(
            <option key={stop.id} value={stop.id}>{stop.name}</option>
          )
      })

      return (
            <div>
                <label>{this.props.label}</label>
                <input type="text" name={this.props.label} id={this.props.label} value={this.props.value} onChange={this.handleChange}/>

                <select name="originStops" onChange={this.handleFormChange}>
                  {stopOptions}
                </select>
            </div>
      )
  }
}


export default OriginForm;
