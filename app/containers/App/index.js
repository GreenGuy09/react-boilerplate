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
import NavigationBar from 'containers/NavigationBar';
import Footer from 'components/Footer';
import config from '../../config';

import GlobalStyle from '../../global-styles';
import reducer from './reducer';
import saga from './saga';
import Routes from './Routes';
import { makeSelectIsAuthenticated } from './selectors';
import { loadUserProfile } from './actions';

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
    this.loadFacebookSDK();

    try {
      await this.props.onLoadUserProfile();
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }

  loadFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2',
      });

      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }

      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  render() {
    const { isAuthenticated } = this.props;
    const childProps = {
      isAuthenticated,
    };

    return (
      <AppWrapper>
        <NavigationBar />
        <Routes childProps={childProps} />
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLoadUserProfile: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadUserProfile: () => dispatch(loadUserProfile()),
  };
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
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
