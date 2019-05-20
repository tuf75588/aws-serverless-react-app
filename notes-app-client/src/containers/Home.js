import React from "react";
import { ListGroup, PageHeader, ListGroupItem } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
class Home extends React.Component {
  state = {
    notes: [],
    isLoading: false
  };
  async componentDidMount() {
    if (!this.props.isAuthenticated) return;
    try {
      const notes = await this.notes();
      this.setState({ notes });
    } catch (error) {
      alert(error);
    }
  }
  notes = () => {
    return API.get("notes", "/notes");
  };
  renderNotesList = (notes) => {
    return [{}].concat(notes).map((note, i) => {
      return i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem header={note.content.trim().split("\n")[0]}>
            {`Created: ${new Date(note.createdAt).toLocaleString()}`}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key='new' to='/notes/new'>
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      );
    });
  };
  renderLandingUI = () => {
    return (
      <div className='Home'>
        <div className='lander'>
          <h1>Scratch</h1>
          <p>A simple note taking app</p>
        </div>
      </div>
    );
  };
  renderNotes = () => {
    return (
      <div className='notes'>
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.props.isAuthenticated
          ? this.renderNotes()
          : this.renderLandingUI()}
      </div>
    );
  }
}
export default Home;
