import React, {Component} from 'react'
import { Link } from 'react-router';

class JourneyTile extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    return(
        <div key={this.props.id} className="journeyTile">
          <Link to= {`/journeys/${this.props.id}`}>
            <h1>{this.props.line.name}</h1>
            <h3>From: {this.props.origin.name}</h3>
            <h3>To: {this.props.destination.name}</h3>
          </Link>
          <button className="delete-button" onClick={this.props.handleDelete} type="delete" value="x">
            <span className="delete-x">x</span>
          </button>
        </div>
    )
  }
}

export default JourneyTile
