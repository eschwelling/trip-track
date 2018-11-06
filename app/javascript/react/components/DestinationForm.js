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
          <div>
              <label className="field-name">{this.props.label}</label>
                <label className="select select-s" htmlFor="select-s">
                  <select id="select-s" name="destinationStops" onChange={this.handleFormChange}>
                {stopOptions}
              </select>
            </label>
          </div>
      )
  }
}


export default DestinationForm;
