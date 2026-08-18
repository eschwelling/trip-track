import React from 'react'

const NoteTile = (props) => {
  return(
      <div className="border-4 border-tile bg-gray-200 p-4">
        <h5 className="text-lg">{props.body}</h5>
        {props.photo && props.photo.url &&
          <div className="mt-3">
            <a href={`#img${props.id}`}>
              <img src={props.photo.url} className="max-w-full sm:max-w-xs" alt="Trip note" />
            </a>
            <a href="#" className="lightbox" id={`img${props.id}`}>
              <img src={props.photo.url} alt="Trip note (full size)" />
            </a>
          </div>
        }
        <p className="mt-3 bg-white px-2 py-1 text-sm">{props.date}</p>
        <p className="bg-white px-2 py-1 text-sm"> - by: {props.user.user_name}</p>
    </div>
  )
}

export default NoteTile
