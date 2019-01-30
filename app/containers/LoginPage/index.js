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
import { changeEmail, changePassword, loginValidated } from './actions';
import { login } from '../App/actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectValidated,
} from './selectors';
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
          <Form
            noValidate
            validated={this.props.validated}
            onSubmit={this.props.onSubmit}
          >
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                autoFocus
                type="email"
                value={this.props.email}
                onChange={this.props.onChangeEmail}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={this.props.password}
                onChange={this.props.onChangePassword}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <Link to="/login/reset">Forgot password?</Link>
            <Button block type="submit">
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
  validated: PropTypes.bool,
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
      const form = evt.currentTarget;
      if (form.checkValidity() === false) {
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        dispatch(login());
      }
      dispatch(loginValidated());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  validated: makeSelectValidated(),
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
