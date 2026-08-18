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
      <h3 className="border-y border-gray-300 py-3 text-center font-display text-xl">Trip Notes</h3>
      <form className="mt-4 flex flex-col gap-4 sm:flex-row" onSubmit={props.handleSubmit} >
        <textarea
          rows="6"
          name="note"
          className="field-input sm:flex-1"
          placeholder="How was the trip?"
          value={props.content}
          onChange={props.handleChange}
        />

        <div className="flex flex-col gap-3 sm:w-64">
          <div className="cursor-pointer rounded border-2 border-dashed border-gray-400 p-4 text-center text-sm text-gray-600 hover:border-mbta" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Try dropping some files here, or click to select files to upload.</p>
          </div>

          {files.length > 0 &&
            <aside>
              <h5 className="text-sm font-bold">Dropped files</h5>
              <ul>
                {
                  files.map(f => <p className="text-xs text-gray-600" key={f.name}>{f.name} - {f.size} bytes</p>)
                }
              </ul>
            </aside>
          }
          {message && <p className="text-sm text-red-600">{message}</p>}

          <button className="btn" type="submit" value="Submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default NoteForm
