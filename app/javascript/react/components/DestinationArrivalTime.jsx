import React from 'react'

const DestinationArrivalTime = (props) => {

    let convertedDate;
    let arrivalTime = props.arrivalTime
    if (arrivalTime) {
      convertedDate = arrivalTime.slice(0, -6).substring(11)
    }

  return(
    <div className="destination-predictions">
      <h6 key={props.id}>Next Arrival: {convertedDate} </h6>
    </div>
  )
}



export default DestinationArrivalTime
