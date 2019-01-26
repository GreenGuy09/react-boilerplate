/*
 * LoginPage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H1 from 'components/H1';
import LoaderButton from 'components/LoaderButton/LoaderButton';
import messages from './messages';
import { changeEmail, changePassword, login } from './actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectIsLoading,
  makeSelectIsAuthenticated,
  makeSelectIsAuthenticating,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.PureComponent {
  handleSubmit = async event => {
    event.preventDefault();
  };

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
          <form onSubmit={this.props.onSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
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
            <LoaderButton
              block
              bsSize="large"
              disabled={false}
              type="submit"
              isLoading={this.props.isLoading}
              text="Login"
              loadingText="Logging in…"
            />
          </form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
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
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
