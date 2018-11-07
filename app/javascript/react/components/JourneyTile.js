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
        <div className="row">
          <div key={this.props.id} className="commute-tile">
            <Link className="commute-tile-link" to= {`/journeys/${this.props.id}`}>
              <h3>{this.props.line.name} - {this.props.line.short_name}</h3>
              <h5>From: {this.props.origin.name}</h5>
              <h5>To: {this.props.destination.name}</h5>
            </Link>
            <button className="delete-button button button-s" onClick={this.props.handleDelete} type="delete" value="x">
              <span className="delete">x</span>
            </button>
          </div>
        </div>
    )
  }
}

export default JourneyTile
