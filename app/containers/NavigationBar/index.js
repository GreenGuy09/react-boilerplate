import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { logout } from '../App/actions';
import {
  makeSelectIsAuthenticated,
  makeSelectUserProfile,
} from '../App/selectors';

export class NavigationBar extends React.PureComponent {
  render() {
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
              {this.props.isAuthenticated ? (
                <Fragment>
                  <NavDropdown
                    title={this.props.userProfile.email}
                    id="user-nav-dropdown"
                  >
                    <LinkContainer to="/settings">
                      <MenuItem>Settings</MenuItem>
                    </LinkContainer>
                    <MenuItem onClick={this.props.onLogout}>Logout</MenuItem>
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
}

NavigationBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogout: PropTypes.func,
  userProfile: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
  };
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  userProfile: makeSelectUserProfile(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(NavigationBar);
