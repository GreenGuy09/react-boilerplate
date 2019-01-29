import React from 'react';
import PropTypes from 'prop-types';
import {
  HelpBlock,
  FormGroup,
  Glyphicon,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import LoaderButton from 'components/LoaderButton/LoaderButton';
import { sendCode, changeField, confirmCode } from './actions';
import {
  makeSelectCode,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectCodeSent,
  makeSelectConfirmed,
  makeSelectIsConfirming,
  makeSelectIsSendingCode,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ResetPasswordPage extends React.PureComponent {
  renderRequestCodeForm() {
    return (
      <form onSubmit={this.props.onSendCodeSubmit}>
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.props.email}
            onChange={this.props.onChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          loadingText="Sending…"
          text="Send Confirmation"
          isLoading={this.props.isSendingCode}
          // disabled={!this.validateCodeForm()}
        />
      </form>
    );
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.props.onConfirmSubmit}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.props.code}
            onChange={this.props.onChange}
          />
          <HelpBlock>
            Please check your email ({this.props.email}) for the confirmation
            code.
          </HelpBlock>
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="password">
          <ControlLabel>New Password</ControlLabel>
          <FormControl
            type="password"
            value={this.props.password}
            onChange={this.props.onChange}
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="confirmPassword">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={this.props.onChange}
            value={this.props.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          text="Confirm"
          loadingText="Confirm…"
          isLoading={this.props.isConfirming}
          // disabled={!this.validateResetForm()}
        />
      </form>
    );
  }

  renderSuccessMessage() {
    return (
      <div className="success">
        <Glyphicon glyph="ok" />
        <p>Your password has been reset.</p>
        <p>
          <Link to="/login">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
    );
  }

  render() {
    if (!this.props.codeSent) {
      return this.renderRequestCodeForm();
    }
    if (!this.props.confirmed) {
      return this.renderConfirmationForm();
    }
    return this.renderSuccessMessage();
  }
}

ResetPasswordPage.propTypes = {
  code: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  codeSent: PropTypes.bool,
  confirmed: PropTypes.bool,
  confirmPassword: PropTypes.string,
  isConfirming: PropTypes.bool,
  isSendingCode: PropTypes.bool,
  onSendCodeSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onConfirmSubmit: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChange: evt => dispatch(changeField(evt.target.id, evt.target.value)),
    onSendCodeSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(sendCode());
    },
    onConfirmSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(confirmCode());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  codeSent: makeSelectCodeSent(),
  confirm: makeSelectConfirmed(),
  isConfirming: makeSelectIsConfirming(),
  isSendingCode: makeSelectIsSendingCode(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'reset', reducer });
const withSaga = injectSaga({ key: 'reset', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetPasswordPage);
