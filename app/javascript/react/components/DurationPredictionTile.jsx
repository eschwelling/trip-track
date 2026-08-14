import React from 'react'
import moment from 'moment';

// Presentational only - DurationPrediction records the whole batch of trips in
// a single request rather than each tile saving itself on mount.
const DurationPredictionTile = (props) => {
  const arrivalTime = props.arrival.attributes.arrival_time
  const destinationTime = props.destination.attributes.arrival_time
  const predictedTime = Math.floor((new Date(destinationTime) - new Date(arrivalTime)) / 60000)

  return(
    <div className="mb-4 bg-tile p-4 text-white sm:p-6">
      <h1 id="duration-prediction-tile" className="font-display text-4xl font-bold sm:text-6xl">{predictedTime} minutes</h1>
      <h2 className="mt-3 text-sm text-gray-300">arrival time at origin:</h2>
        <h1 className="text-2xl sm:text-4xl">{moment(arrivalTime).utcOffset('-0500').format("hh:mm:ss A")}</h1>
      <h2 className="mt-3 text-sm text-gray-300">arrival time at destination:</h2>
        <h1 className="text-2xl sm:text-4xl">{moment(destinationTime).utcOffset('-0500').format("hh:mm:ss A")}</h1>
    </div>
  )
}

export default DurationPredictionTile
