import React from 'react'

const NoteTile = (props) => {
  return(
      <div className="">
        <div className="note-tile small-10 medium-10 large-12 columns">
          <div key={props.id} className="note-text">
            <h5>{props.body}</h5>
          </div>
            <a href="#img1">
              <img src={props.photo.url} className="thumbnail"/>
            </a>

            <a href="#" className="lightbox" id="img1">
              <img src={props.photo.url}/>
            </a>
            <p className="note-user-name">{props.date}</p>
            <p className="note-user-name"> - by: {props.user.user_name}</p>
        </div>
    </div>
  )
}










export default NoteTile
