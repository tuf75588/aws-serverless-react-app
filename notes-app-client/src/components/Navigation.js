import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function Navigation({ isAuthenticated, onNavClick }) {
  return (
    <div className='App container'>
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to='/login'>
              {isAuthenticated ? (
                <NavItem onClick={() => onNavClick(false)}>Logout</NavItem>
              ) : (
                <React.Fragment>
                  <LinkContainer to='/signup'>
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </React.Fragment>
              )}
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default Navigation;
