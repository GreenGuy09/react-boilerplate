import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function Header({ isAuthenticated, onLogout, userProfile }) {
  return (
    <div>
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Caregivers</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ? (
              <Fragment>
                <NavDropdown title={userProfile.email} id="user-nav-dropdown">
                  <LinkContainer to="/settings">
                    <MenuItem>Settings</MenuItem>
                  </LinkContainer>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </NavDropdown>
              </Fragment>
            ) : (
              <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogout: PropTypes.func,
  userProfile: PropTypes.object,
};

export default Header;
