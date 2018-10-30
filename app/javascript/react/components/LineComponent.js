import React, { Component } from 'react'

import LineStopsForm from './LineStopsForm'

class LineComponent extends Component{
  constructor(props) {
    super(props)
    this.state = {
      lineInfo: [],
      selectedLine: {}
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // chooseRoute(formPayload) {
  //   fetch(`https://api-v3.mbta.com/routes/${this.state.selectedRoute.route}`, {
  //     method: "POST",
  //     body: JSON.stringify(formPayload)
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       return response;
  //     } else {
  //       let errorMessage = `${response.status} (${response.statusText})`,
  //       error = new Error(errorMessage);
  //       throw(error);
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(body => {
  //     this.setState({ selectedRoute: body })
  //   })
  // }

  handleChange(event){
    this.setState({ selectedLine: event.target.value })
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
      this.setState({ lineInfo: body })
      console.log(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    let lines = this.state.lineInfo.map(line => {
      // if (line.description === "Rapid Transit") {
      //   return(
      //     <option key={line.id} value={line.name}>{line.name} - {line.description}</option> )
      // } else if (line.description === "Commuter Rail") {
      //   return(
      //     <option key={line.id} value={line.name}>{line.name} - {line.description}</option> )
      // } else if (line.description === "Ferry") {
      //   return(
      //     <option key={line.id} value={line.name}>{line.name} - {line.description}</option> )
      // } else {
      //   return(
      //     <option key={line.id} value={line.name}>{line.name} - {line.description}</option> )
      // }
      return(
        <option key={line.id} value={line.name}>{line.name} - {line.description}</option>
      )
    })


    return(
        <div className="train-line-form">
          <div className="rows columns">
            <form className="text-center line" name="line" action="/" method="post">
            <select name="line" onChange={this.handleChange}>
            {lines}
            </select>
            <button value="submit" type="submit" >Choose Your Route!</button>
            </form>
          </div>
          <LineStopsForm
          id = {this.state.selectedLine}
          key = {this.state.selectedLine}
          name = {this.state.selectedLine}
          description = {this.state.selectedLine}
          />
      </div>
    )
  }
}



export default LineComponent
