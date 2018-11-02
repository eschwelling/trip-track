import React, { Component } from 'react'

class LineForm extends Component{
  constructor(props) {
    super(props)
    this.state = {
      allLines: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

    handleChange(event){
      this.props.handlePayload(event.target.value)
  }

  componentDidMount(){
    fetch('/api/v1/lines')
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
      this.setState({ allLines: body })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let lines = this.state.allLines.map(line => {

      return(
        <option key={line.id} value={line.id}>{line.name} - {line.description} - {line.short_name}</option>
      )
    })

    return(
              <select name="line" onChange={this.handleChange}>
                {lines}
              </select>
          )
  }
}



export default LineForm
