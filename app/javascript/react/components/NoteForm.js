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
      <div>
        <h3 className="trip-notes">Trip Notes</h3>
        <hr/>
        <label className="form-label">
          <div className="row">
            <form className="text-center" onSubmit={this.props.handleSubmit} >
              <div className="columns small-8">
                <textarea
                  rows="6"
                  cols="5"
                  name="note"
                  type='text'
                  value={this.props.content}
                  onChange={this.props.handleChange}
                />
              </div>

                  <div className="drop small-2 columns">
                     <Dropzone onDrop={this.onDrop}>
                       <p>Try dropping some files here, or click to select files to upload.</p>
                     </Dropzone>
                   </div>

                   <div className="small-2 columns">
                   <aside>
                     <h5>Dropped files</h5>
                     <ul>
                       {
                         this.state.files.map(f => <p className="dropped-files" key={f.name}>{f.name} - {f.size} bytes</p>)
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
}

export default NoteForm
