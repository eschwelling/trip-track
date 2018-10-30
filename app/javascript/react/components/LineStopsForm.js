import React, { Component } from 'react'
import Autocomplete from  'react-autocomplete';

class LineStopsForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      origin: "",
      destination: "",
      stops: []
    }
    this.handleOriginChange = this.handleOriginChange.bind(this)
    this.handleDestinationChange = this.handleDestinationChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearButton = this.clearButton.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/stops')
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
      this.setState({ stops: body })
      console.log(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  handleOriginChange(event) {
    let originInput = event.target.value
    this.setState({ origin: originInput })
    console.log(this.state.origin)
  }

  handleDestinationChange(event) {
    let destinationInput = event.target.value
    this.setState({ destination: destinationInput})
    console.log(this.state.destination)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(`Form Submitted: ${this.state.origin}, ${this.state.destination}`)
    const body = JSON.stringify({
    search_string: this.state.searchString
    })
    fetch('/api/v1/stops/search.json', {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ stops: body })
    })
  }

  clearButton(event) {
    event.preventDefault()
    this.setState({ origin: "", destination: ""})
  }

    render(){
      const stops = this.state.stops.map(shop => {
        return(
          <li>{stop.name}</li>
        )
      })


      return (
        <div>
            // <form className="new-article-form callout" onSubmit="">
            //   <label>Origin</label>
            //   <input type="text" name="origin" id="origin" value={this.state.origin} onChange={this.handleOriginChange}/>
            //   <label>Destination</label>
            //   <input type="text" name="destination" id="destination" value={this.state.destination} onChange={this.handleDestinationChange}/>

            <Autocomplete
            inputProps={{ id: 'states-autocomplete' }}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
            value={this.state.value}
            items={this.state.unitedStates}
            getItemValue={(item) => item.name}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.setState({ value, unitedStates: [ item ] })
              // or you could reset it to a default list again
              // this.setState({ unitedStates: getStates() })
            }}
            onChange={(event, value) => {
              this.setState({ value })
              clearTimeout(this.requestTimer)
              this.requestTimer = fakeRequest(value, (items) => {
                this.setState({ unitedStates: items })
              })
            }}
            renderMenu={children => (
              <div className="menu">
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                key={item.abbr}
              >{item.name}</div>
            )}
          />

              <div className="button-group">
                <button className="button" onClick={this.clearButton}>Clear</button>
                <input className="button" type="submit" value="Submit" onClick={this.handleSubmit} />
              </div>
            </form>
        </div>
      )
  }
}


export default LineStopsForm;
