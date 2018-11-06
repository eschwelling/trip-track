import React, {Component} from 'react'

class DirectionSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleFormChange(event) {
    let payload = event.target.value
    this.props.handlePayload(payload)
  }

  render(){
    return(
      <label className="select select-s" htmlFor="select-s">
      <select id="select-s" name="directionMenu" onChange={this.handleFormChange}>
        <option value='0'>Inbound</option>
        <option value='1'>Outbound</option>
      </select>
    </label>
    )
  }
}



export default DirectionSelector
