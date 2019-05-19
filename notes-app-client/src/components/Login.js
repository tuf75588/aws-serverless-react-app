import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
function Login(props) {
  const [fields, setFields] = useState({ email: "", password: "" });
  function validateForm() {
    const { email, password } = fields;
    return email.length && password.length > 0;
  }
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted!");
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
