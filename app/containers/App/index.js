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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';
import reducer from './reducer';
import saga from './saga';
import Routes from './Routes';
import {
  makeSelectUserProfile,
  makeSelectIsAuthenticated,
  makeSelectIsAuthenticating,
} from './selectors';
import { loadUserProfile, logout } from './actions';

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
      await this.props.onLoadUserProfile();
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }

  render() {
    const { isAuthenticated, onLogout, userProfile } = this.props;
    const childProps = {
      isAuthenticated,
      onLogout,
      userProfile,
    };

    return (
      <AppWrapper>
        <Header {...childProps} />
        <Routes childProps={childProps} />
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func,
  onUserHasAuthenticated: PropTypes.func,
  onLoadUserProfile: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
    onLoadUserProfile: () => dispatch(loadUserProfile()),
  };
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  isAuthenticating: makeSelectIsAuthenticating(),
  userProfile: makeSelectUserProfile(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(App);
