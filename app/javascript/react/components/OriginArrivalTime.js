import React from 'react'

const OriginArrivalTime = (props) => {
    let convertedDate;
    let arrivalTime = props.arrivalTime
    if (arrivalTime) {
      convertedDate = arrivalTime.slice(0, -6).substring(11)
    }

  return(
    <div className="arrival-predictions">
      <h6 key={props.id}>Next Train Arriving At Origin: {convertedDate} </h6>
    </div>
  )
}

export default OriginArrivalTime;
