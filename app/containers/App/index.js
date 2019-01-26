/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AuthenticatedRoute from '../../components/AuthenticatedRoute/AuthenticatedRoute';
import {
  makeSelectIsAuthenticated,
  makeSelectIsAuthenticating,
} from '../LoginPage/selectors';
import GlobalStyle from '../../global-styles';
import { logout, userHasAuthenticated } from '../LoginPage/actions';
import reducer from '../LoginPage/reducer';
import saga from '../LoginPage/saga';
import UnauthenticatedRoute from '../../components/UnauthenticatedRoute/UnauthenticatedRoute';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends React.PureComponent {
  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.props.onUserHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }

  render() {
    const { isAuthenticated, onLogout } = this.props;
    const childProps = {
      isAuthenticated,
      onLogout,
    };

    return (
      <AppWrapper>
        <Header {...childProps} />
        <Switch>
          <AuthenticatedRoute
            exact
            path="/"
            component={HomePage}
            props={childProps}
          />
          <AuthenticatedRoute
            path="/features"
            component={FeaturePage}
            props={childProps}
          />
          <UnauthenticatedRoute
            path="/login"
            component={LoginPage}
            props={childProps}
          />
          <UnauthenticatedRoute
            path="/signup"
            component={SignUpPage}
            props={childProps}
          />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  onLogout: PropTypes.func,
  onUserHasAuthenticated: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
    onUserHasAuthenticated: evt => {
      dispatch(userHasAuthenticated(evt));
    },
  };
}

const mapStateToProps = createStructuredSelector({
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
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(App);
