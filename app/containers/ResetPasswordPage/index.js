import React from 'react';
import PropTypes from 'prop-types';
import { Form, Glyphicon, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

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
      <Form noValidate onSubmit={this.props.onSendCodeSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={this.props.email}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Button block type="submit">
          Send Confirmation
        </Button>
      </Form>
    );
  }

  renderConfirmationForm() {
    return (
      <Form noValidate onSubmit={this.props.onConfirmSubmit}>
        <Form.Group controlId="code">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            value={this.props.code}
            onChange={this.props.onChange}
          />
          <p>
            Please check your email ({this.props.email}) for the confirmation
            code.
          </p>
        </Form.Group>
        <hr />
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={this.props.password}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={this.props.onChange}
            value={this.props.confirmPassword}
          />
        </Form.Group>
        <Button block type="submit">
          Confirm
        </Button>
      </Form>
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
