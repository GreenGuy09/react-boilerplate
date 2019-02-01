import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H2 from 'components/H2';
import { Form, Button } from 'react-bootstrap';
import messages from './messages';
import { makeSelectUserProfile } from '../App/selectors';
import {
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectConfirmPassword,
  makeSelectValidated,
} from './selectors';
import {
  changePassword,
  changeOldPassword,
  changeNewPassword,
  changeConfirmPassword,
  changePasswordValidated,
} from './actions';
import reducer from './reducer';
import saga from './saga';

export class UserSettingsPage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>Settings</title>
          <meta
            name="description"
            content="A Family Caregiver Application settings page"
          />
        </Helmet>
        <div>
          <H2>
            <FormattedMessage {...messages.userSettingsHeader} />
          </H2>
          <section>
            <Form
              noValidate
              validated={this.props.validated}
              onSubmit={this.props.onChangePasswordSubmit}
            >
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={this.props.userProfile.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  autoFocus
                  required
                  type="password"
                  value={this.props.oldPassword}
                  onChange={this.props.onChangeOldPassword}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={this.props.newPassword}
                  onChange={this.props.onChangeNewPassword}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
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
                Change Password
              </Button>
            </Form>
          </section>
        </div>
      </article>
    );
  }
}

UserSettingsPage.propTypes = {
  userProfile: PropTypes.object,
  validated: PropTypes.bool,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string,
  confirmPassword: PropTypes.string,
  onChangeOldPassword: PropTypes.func,
  onChangeNewPassword: PropTypes.func,
  onChangeConfirmPassword: PropTypes.func,
  onChangePasswordSubmit: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePasswordSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      const form = evt.currentTarget;
      if (form.checkValidity() === false) {
        evt.stopPropagation();
      } else {
        dispatch(changePassword());
      }
      dispatch(changePasswordValidated());
    },
    onChangeOldPassword: evt => dispatch(changeOldPassword(evt.target.value)),
    onChangeNewPassword: evt => dispatch(changeNewPassword(evt.target.value)),
    onChangeConfirmPassword: evt =>
      dispatch(changeConfirmPassword(evt.target.value)),
  };
}

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserProfile(),
  validated: makeSelectValidated(),
  oldPassword: makeSelectOldPassword(),
  newPassword: makeSelectNewPassword(),
  confirmPassword: makeSelectConfirmPassword(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settings', reducer });
const withSaga = injectSaga({ key: 'settings', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserSettingsPage);
