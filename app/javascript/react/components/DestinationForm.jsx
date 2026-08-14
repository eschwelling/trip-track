import React, { Component } from 'react'


class DestinationForm extends Component {
  constructor(props){
    super(props)

    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleFormChange(event) {
    this.props.handleFormChange(event.target.value)
  }

    render(){
      let stopOptions = this.props.stops.map(stop => {
        return(
            <option key={stop.id} value={stop.id}>{stop.attributes.name}</option>
          )
      })

      return (
            <label className="block">
              <span className="mb-1 block font-display text-sm">{this.props.label}</span>
              <select className="field-input" name="destinationStops" onChange={this.handleFormChange}>
                {stopOptions}
              </select>
            </label>
      )
  }
}


export default DestinationForm;
