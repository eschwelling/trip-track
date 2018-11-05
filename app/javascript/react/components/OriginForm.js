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
            <option key={stop.id} value={stop.id}>{stop.attributes.name}</option>
          )
      })

      return (
            <div>
                <label className="field-name">{this.props.label}</label>
                <label className="select select-l" htmlFor="select-l">
                <select id="select-l" name="originStops" onChange={this.handleFormChange}>
                  {stopOptions}
                </select>
                </label>
            </div>
      )
  }
}


export default OriginForm;
