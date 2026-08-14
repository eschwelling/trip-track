import React, {Component} from 'react'
import { Link } from 'react-router-dom';

class JourneyTile extends Component {
  render() {
    return(
        <div className="flex items-start justify-between gap-3 bg-tile p-4 text-white">
          <Link className="commute-tile-link min-w-0 no-underline" to={`/journeys/${this.props.id}`}>
            <h3 className="font-display text-lg text-white">{this.props.line.name} - {this.props.line.short_name}</h3>
            <h5 className="mt-1 text-sm text-gray-200">From: {this.props.origin.name}</h5>
            <h5 className="text-sm text-gray-200">To: {this.props.destination.name}</h5>
          </Link>
          <button
            type="button"
            aria-label="Delete commute"
            className="shrink-0 cursor-pointer text-xl leading-none text-white/60 hover:text-white"
            onClick={this.props.handleDelete}
          >&#x2715;</button>
        </div>
    )
  }
}

export default JourneyTile
