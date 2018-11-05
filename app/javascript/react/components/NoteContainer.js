import React, { Component } from 'react'
import NoteForm from './NoteForm'
import NoteTile from './NoteTile'

class NoteContainer extends Component {
  constructor(props){
    super(props)
    this.state ={
      notes: [],
      noteBody: "",
      user: {},
      photoFile: ""
    }
    this.handleNewNoteBody = this.handleNewNoteBody.bind(this)
    this.handlePhotoFile = this.handlePhotoFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNewNoteBody(event){
    this.setState({ noteBody: event.target.value})
  }

  handlePhotoFile(event){
    this.setState({ photoFile: event})
  }

  componentDidMount(){
    fetch(`/api/v1/journeys/${this.props.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ user: body.journey.user, notes: body.journey.notes })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event) {
    event.preventDefault();
    let body = new FormData()
    body.append("body", this.state.noteBody)
    body.append("journey", parseInt(this.props.id))
    body.append("user", this.state.user.id)
    body.append("photo_path", this.state.photoFile[0])
    fetch(`/api/v1/journeys/${this.props.id}/notes`, {
      method: 'POST',
      body: body,
      headers: {
        'Accept':  'application/json'},
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newNotes = this.state.notes.concat(body.note)
      this.setState({ notes: newNotes})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }



  render(){
    let mappedNotes = this.state.notes.map(note => {
      return(
        <NoteTile
          created_at={note.created_at}
          id={note.id}
          body={note.body}
          user={this.state.user}
          photo={note.photo_path}
          />
      )
    })
    return(
      <div>
        <div>
          <NoteForm
            handleChange={this.handleNewNoteBody}
            content={this.state.noteBody}
            handleSubmit={this.handleSubmit}
            handlePhoto={this.handlePhotoFile}
          />
        </div>
        <div>
          {mappedNotes}
        </div>
      </div>
    )
  }
}


export default NoteContainer
