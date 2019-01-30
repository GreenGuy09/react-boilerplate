/*
 * SignUpPage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H1 from 'components/H1';
import messages from './messages';
import {
  changeEmail,
  changePassword,
  changeConfirmPassword,
  signUp,
  changeConfirmationCode,
  confirmSignUp,
  signUpValidated,
} from './actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectConfirmPassword,
  makeSelectIsLoading,
  makeSelectNewUser,
  makeSelectConfirmationCode,
  makeSelectValidatedSignUp,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SignUpPage extends React.PureComponent {
  renderConfirmationForm() {
    return (
      <Form noValidate onSubmit={this.props.onConfirmationSubmit}>
        <Form.Group controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            required
            autoFocus
            type="tel"
            value={this.props.confirmationCode}
            onChange={this.props.onChangeConfirmationCode}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid confirmation code.
          </Form.Control.Feedback>
          <p>Please check your email for the code.</p>
        </Form.Group>
        <Button block type="submit">
          Verify
        </Button>
      </Form>
    );
  }

  renderForm() {
    return (
      <Form
        noValidate
        validated={this.props.validatedSignUp}
        onSubmit={this.props.onSubmit}
      >
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={this.props.confirmPassword}
            onChange={this.props.onChangeConfirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button block type="submit">
          Sign Up
        </Button>
      </Form>
    );
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <div>
          {this.props.newUser === null
            ? this.renderForm()
            : this.renderConfirmationForm()}
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  isLoading: PropTypes.bool,
  newUser: PropTypes.object,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  validatedSignUp: PropTypes.bool,
  confirmationCode: PropTypes.string,
  onSubmit: PropTypes.func,
  onConfirmationSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeConfirmPassword: PropTypes.func,
  onChangeConfirmationCode: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onChangeConfirmPassword: evt =>
      dispatch(changeConfirmPassword(evt.target.value)),
    onSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      const form = evt.currentTarget;
      if (form.checkValidity() === false) {
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        dispatch(signUp());
      }
      dispatch(signUpValidated());
    },
    onChangeConfirmationCode: evt =>
      dispatch(changeConfirmationCode(evt.target.value)),
    onConfirmationSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(confirmSignUp());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  confirmPassword: makeSelectConfirmPassword(),
  validatedSignUp: makeSelectValidatedSignUp(),
  confirmationCode: makeSelectConfirmationCode(),
  newUser: makeSelectNewUser(),
  isLoading: makeSelectIsLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signUp', reducer });
const withSaga = injectSaga({ key: 'signUp', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignUpPage);
