import React, { useState, useEffect } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";
import LoaderButton from "./LoaderButton";
function Login(props) {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [shouldRedirect, setRedirect] = useState(false);
  const [isLoading, setLoading] = useState(false);
  function validateForm() {
    const { email, password } = fields;
    return email.length && password.length > 0;
  }
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { userHasAuthenticated } = props;
    setLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      setFields({ email: "", password: "" });
      setRedirect(true);
    } catch (error) {
      alert("error", error);
    }
  }
  if (shouldRedirect) {
    return <Redirect to='/' />;
  }
  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='email' bsSize='large'>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type='email'
            name='email'
            autoFocus
            value={fields.email}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup controlId='password' bsSize='large'>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name='password'
            type='password'
            autoFocus
            value={fields.password}
            onChange={handleInputChange}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize='large'
          disabled={!validateForm()}
          type='submit'
          isLoading={isLoading}
          text='Login'
          loadingText='Logging in…'
        />
      </form>
    </div>
  );
}
export default Login;
