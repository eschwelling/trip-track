import React from 'react'

const NoteTile = (props) => {
  return(
    <div key={props.id}>
      <h5>{props.body}</h5>
      <h5>{props.created_at}</h5>
      <h5>{props.user.user_name}</h5>
      <img src={props.photo.url}/>
    </div>
  )
}



export default NoteTile
