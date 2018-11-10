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
            <i className="far fa-times-circle fa-lg" onClick={this.props.handleDelete} type="delete"></i>
          </div>
        </div>
    )
  }
}

export default JourneyTile
