import React from "react";
import { API, Storage } from "aws-amplify";
import config from "../config";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
//styles
import "../stylesheets/Notes.css";

import { s3Upload } from "../libs/awsLib";
class Notes extends React.Component {
  file = null;
  state = {
    note: null,
    content: "",
    attachmentURL: "",
    error: "",
    isDeleting: false
  };
  async componentDidMount() {
    try {
      let attachmentURL;
      const note = await this.getNote();
      const { content, attachment } = note;
      // is there an attachment in the note?
      if (attachment) {
        //grab a reference to the attachment file
        attachmentURL = await Storage.vault.get(attachment);
      }
      //finally, set state.
      this.setState({
        attachmentURL,
        content,
        note
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  //! method for saving changes to an existing note.
  saveNote = (note) => {
    return API.put("notes", `/notes/${this.props.match.params.id}`, {
      body: note
    });
  };

  formatFilename = (str) => {
    return str.replace(/^\w+-/, "");
  };

  validateForm = () => {
    const { content } = this.state;
    return content.length > 0;
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleFileChange = (event) => {
    this.file = event.target.file[0];
  };
  handleSubmit = async (event) => {
    let attachment;
    event.preventDefault();
    const { content } = this.state;
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
    this.setState({ isLoading: true });
    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
      }
      await this.saveNote({
        content,
        attachment: attachment || this.state.attachment
      });
      this.props.history.push("/");
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };
  handleDelete = async (event) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) {
      return;
    }
    this.setState({ isDeleting: true });
  };

  getNote = () => {
    const { params } = this.props.match;
    return API.get("notes", `/notes/${params.id}`);
  };
  render() {
    const { error, note, isLoading, attachmentURL } = this.state;
    return (
      <div className='Notes'>
        {error && <h1>{error.message}</h1>}
        {note && (
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId='content'>
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass='textarea'
              />
            </FormGroup>
            {note.attachment && (
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={attachmentURL}
                  >
                    {this.formatFilename(note.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>
            )}
            <FormGroup controlId='file'>
              {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type='file' />
            </FormGroup>
            <LoaderButton
              block
              bsSize='large'
              bsStyle='primary'
              disabled={!this.validateForm()}
              text='Save'
              type='submit'
              onClick={() => this.saveNote(note)}
              isLoading={isLoading}
              loadingText='Saving..'
            />
            <LoaderButton
              block
              bsSize='large'
              bsStyle='danger'
              isLoading={isLoading}
              onClick={this.handleDelete}
              text='Delete'
              loadingText='Deleting..'
            />
          </form>
        )}
      </div>
    );
  }
}
export default Notes;
