import React from 'react'

const DurationPredictionTile = (props) => {
  let arrivalTime = props.arrival.attributes.arrival_time
  let destinationTime = props.destination.attributes.arrival_time

  let predictedTime = Math.floor(( new Date(destinationTime) - new Date(arrivalTime))/60000)
  // let timeEstimate = Math.abs(props.arrival.attributes.arrival_time - props.destination.attributes.arrival_time)


  // need to change math here!//
  return(
    <div>
      <h2>the next trip will take: {predictedTime} minutes</h2>
      <h5>arrival time at origin: {arrivalTime} </h5>
      <h5>arrival time at destination: {destinationTime}</h5>
    </div>
  )
}

export default DurationPredictionTile
