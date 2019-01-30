import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
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
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>Caregivers</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {this.props.isAuthenticated ? (
                <NavDropdown title={this.props.userProfile.email}>
                  <LinkContainer to="/settings">
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.props.onLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Fragment>
                  <LinkContainer to="/signup">
                    <Nav.Link>SignUp</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
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
