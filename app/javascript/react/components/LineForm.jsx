import React, { Component } from 'react'

class LineForm extends Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.props.handlePayload(event.target.value)
  }

  render(){
    let lines = this.props.lines.map(line => {
      return(
        <option key={line.id} value={line.mbta_id}>{line.name} - {line.description} - {line.short_name}</option>
      )
    })

    return(
            <label className="select select-s" htmlFor="select-s">
              <select id="select-s" name="line" value={this.props.value} onChange={this.handleChange}>
                {lines}
              </select>
            </label>
          )
  }
}



export default LineForm
