import React from 'react'

const NoteTile = (props) => {
  return(
    <div className="row">
      <div className="small-12 columns">
        <div className="note-tile" key={props.id}>
          <div key={props.id} className="note-text">
            <p>{props.date}</p>
            <h5>{props.body}</h5>
            <p> - by: {props.user.user_name}</p>
          </div>
          <img src={props.photo.url}/>
        </div>
    </div>
  </div>
  )
}



export default NoteTile
