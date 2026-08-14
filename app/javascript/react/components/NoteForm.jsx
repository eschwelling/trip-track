import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function NoteForm(props) {
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setFiles(acceptedFiles)
      props.handlePhoto(acceptedFiles)
    } else {
      setMessage('You can only upload one photo per board game.')
    }
  }, [props])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div>
      <hr/>
      <h3 className="trip-notes">Trip Notes</h3>
      <hr/>
      <label className="form-label">
        <div className="row">
          <form className="text-center" onSubmit={props.handleSubmit} >
            <div className="columns small-8">
              <textarea
                rows="6"
                cols="5"
                name="note"
                type='text'
                value={props.content}
                onChange={props.handleChange}
              />
            </div>

                <div className="drop small-2 columns" {...getRootProps()}>
                   <input {...getInputProps()} />
                   <p>Try dropping some files here, or click to select files to upload.</p>
                 </div>

                 <div className="small-2 columns">
                 <aside>
                   <h5>Dropped files</h5>
                   <ul>
                     {
                       files.map(f => <p className="dropped-files" key={f.name}>{f.name} - {f.size} bytes</p>)
                     }
                   </ul>
                 </aside>
               <button className="secondary button button-s" type="submit" value="Submit">Submit</button>
             </div>

          </form>
          <div className="row"></div>
          <hr/>
        </div>
      </label>
  </div>
  )
}

export default NoteForm
