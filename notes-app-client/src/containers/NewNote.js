import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../stylesheets/NewNote.css";
import config from "../config";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
class NewNote extends React.Component {
  file = null;
  state = {
    content: "",
    isLoading: null
  };
  validateForm = () => {
    const { content } = this.state;
    return content.length > 0;
  };
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleFileChange = (event) => {
    this.file = event.target.files[0];
  };
  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    this.setState({ isLoading: true });
    try {
      const attachment = this.file ? await s3Upload(this.file) : null;
      await this.createNote({
        attachment,
        content: this.state.content
      });
      this.props.history.push("/");
    } catch (error) {
      alert(error);
      this.setState({ isLoading: false });
    }
  };
  createNote = (note) => {
    return API.post("notes", "/notes", {
      body: note
    });
  };
  render() {
    return (
      <div className='NewNote'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='content'>
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass='textarea'
            />
          </FormGroup>
          <FormGroup controlId='file'>
            <ControlLabel>Attachment</ControlLabel>
            <FormControl type='file' onChange={this.handleFileChange} />
          </FormGroup>
          <LoaderButton
            block
            bsSize='large'
            bsStyle='primary'
            disabled={!this.validateForm()}
            type='submit'
            isLoading={this.state.isLoading}
            text='Create'
            loadingText='Creating Note..'
          />
        </form>
      </div>
    );
  }
}
export default NewNote;
