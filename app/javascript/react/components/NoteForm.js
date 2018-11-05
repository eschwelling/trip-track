import React, { Component } from 'react'
import Dropzone from 'react-dropzone';

class NoteForm extends Component {
  constructor(props){
    super(props)
    this.state ={
      files: []
    }
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(file) {
  if(file.length == 1) {
    this.setState({ files: file })
    this.props.handlePhoto(file);
  } else {
    this.setState({ message: 'You can only upload one photo per board game.'})
  }
}

  render(){
    return(
      <label className="form-label">
      <form className="text-center small-12 columns" onSubmit={this.props.handleSubmit} >
        <textarea
          rows="4"
          cols="3"
          name="note"
          type='text'
          value={this.props.content}
          onChange={this.props.handleChange}
        />
        <section>
         <div className="dropzone">
           <Dropzone onDrop={this.onDrop}>
             <p>Try dropping some files here, or click to select files to upload.</p>
           </Dropzone>
         </div>
         <aside>
           <h2>Dropped files</h2>
           <ul>
             {
               this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
             }
           </ul>
         </aside>
       </section>
        <input className="secondary button form-button" type="submit" value="Submit" />
        </form>
      </label>
    )
  }
}

export default NoteForm
