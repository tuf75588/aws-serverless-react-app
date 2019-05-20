import React from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "../stylesheets/signup.css";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";
class Signup extends React.Component {
  state = {
    isLoading: false,
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    newUser: null
  };
  componentDidMount() {
    this.setState({ email: "", password: "" });
  }
  validateForm = () => {
    const { email, password, confirmPassword } = this.state;
    return (
      email.length > 0 && password.length > 0 && password === confirmPassword
    );
  };
  validateConfirmationCode = () => {
    const { confirmationCode } = this.state;
    return confirmationCode.length > 0;
  };
  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password
      });
      this.setState({ newUser });
    } catch (error) {
      alert(error.message);
    }
    this.setState({ isLoading: false });
  };
  handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };
  //! these next methods will simply return some JSX to not make our render method too long.
  renderConfirmationForm = () => {
    const { confirmationCode, isLoading } = this.state;

    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId='confirmationCode' bsSize='large'>
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type='tel'
            value={confirmationCode}
            onChange={this.handleInputChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize='large'
          disabled={!this.validateConfirmationCode()}
          type='submit'
          isLoading={isLoading}
          text='Verify'
          loadingText='Verifying…'
        />
      </form>
    );
  };
  renderForm = () => {
    const { email, confirmPassword, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId='email' bsSize='large'>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autofocus
            type='email'
            value={email}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup controlId='password' bsSize='large'>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleInputChange}
            type='password'
          />
        </FormGroup>
        <FormGroup controlId='confirmPassword' bsSize='large'>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={confirmPassword}
            onChange={this.handleInputChange}
            type='password'
          />
        </FormGroup>
        <LoaderButton
          bsSize='large'
          block
          disabled={!this.validateForm()}
          type='submit'
          text='Signup'
          loadingText='Signing up...'
        />
      </form>
    );
  };

  render() {
    const { newUser } = this.state;
    return (
      <div className='Signup'>
        {newUser === null ? this.renderForm() : this.renderConfirmationForm()}
      </div>
    );
  }
}

export default Signup;
