import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
function Login(props) {
  const [fields, setFields] = useState({ email: "", password: "" });
  useEffect(() => {
    if (!props.isAuthenticated) {
      setFields({ email: "", password: "" });
    }
  }, [props.isAuthenticated]);
  function validateForm() {
    const { email, password } = fields;
    return email.length && password.length > 0;
  }
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }

  async function handleSubmit(event) {
    const { userHasAuthenticated } = props;
    event.preventDefault();
    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      console.log("user has logged in!");
    } catch (error) {
      alert("error", error);
    }
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
        <Button block bsSize='large' disabled={!validateForm()} type='submit'>
          Login
        </Button>
      </form>
    </div>
  );
}
export default Login;
