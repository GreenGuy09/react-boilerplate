/*
 * LoginPage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import H1 from 'components/H1';
import messages from './messages';
import { changeEmail, changePassword } from './actions';
import { login } from '../App/actions';
import { makeSelectEmail, makeSelectPassword } from './selectors';
import {
  makeSelectIsAuthenticated,
  makeSelectIsAuthenticating,
  makeSelectIsLoading,
  makeSelectError,
} from '../App/selectors';
import reducer from './reducer';

export class LoginPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <div>
          <Form noValidate onSubmit={this.props.onSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={this.props.email}
                onChange={this.props.onChangeEmail}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.props.password}
                onChange={this.props.onChangePassword}
              />
            </Form.Group>
            <Link to="/login/reset">Forgot password?</Link>
            <Button block disabled={false} type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  onSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(login());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  isLoading: makeSelectIsLoading(),
  isAuthenticated: makeSelectIsAuthenticated(),
  isAuthenticating: makeSelectIsAuthenticating(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect,
)(LoginPage);
