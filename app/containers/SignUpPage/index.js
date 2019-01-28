/*
 * SignUpPage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H1 from 'components/H1';
import LoaderButton from 'components/LoaderButton/LoaderButton';
import messages from './messages';
import {
  changeEmail,
  changePassword,
  changeConfirmPassword,
  signUp,
  changeConfirmationCode,
  confirmSignUp,
} from './actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectConfirmPassword,
  makeSelectIsLoading,
  makeSelectNewUser,
  makeSelectConfirmationCode,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SignUpPage extends React.PureComponent {
  renderConfirmationForm() {
    return (
      <form onSubmit={this.props.onConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.props.confirmationCode}
            onChange={this.props.onChangeConfirmationCode}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          isLoading={this.props.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.props.email}
            onChange={this.props.onChangeEmail}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.props.password}
            onChange={this.props.onChangePassword}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            value={this.props.confirmPassword}
            onChange={this.props.onChangeConfirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={false}
          type="submit"
          isLoading={this.props.isLoading}
          text="Sign Up"
          loadingText="Signing in…"
        />
      </form>
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
      dispatch(signUp());
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
