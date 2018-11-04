import React from 'react'

const DurationPredictionTile = (props) => {
  let arrivalTime = props.arrival.attributes.arrival_time
  let destinationTime = props.destination.attributes.arrival_time

  let predictedTime = (new Date(arrivalTime) - new Date(destinationTime))/60000
  // let timeEstimate = Math.abs(props.arrival.attributes.arrival_time - props.destination.attributes.arrival_time)
  return(
    <div>
      <h2>the next trip will take: {predictedTime} minutes</h2>
      <h5>arrival time at origin: {destinationTime} </h5>
      <h5>arrival time at destination: {arrivalTime}</h5>
    </div>
  )
}

export default DurationPredictionTile
