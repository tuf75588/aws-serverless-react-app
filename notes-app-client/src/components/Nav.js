import React from "react";

import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

function Nav() {
  return (
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>Sketch</Link>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}
export default Nav;
