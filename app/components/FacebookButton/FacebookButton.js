import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function waitForInit() {
  return new Promise(res => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

export default class FacebookButton extends Component {
  async componentDidMount() {
    await waitForInit();
  }

  statusChangeCallback = response => {
    if (response.status === 'connected') {
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    window.FB.login(this.checkLoginState, {
      scope: 'public_profile,email',
      return_scopes: true,
    });
  };

  handleError(error) {
    alert(error);
  }

  async handleResponse(data) {
    this.props.onLogin(data);

    /**
    // this.setState({ isLoading: true });

    try {
      const response = await Auth.federatedSignIn(
        'facebook',
        { token, expires_at },
        user,
      );
      // this.setState({ isLoading: false });

    } catch (e) {
      // this.setState({ isLoading: false });
      this.handleError(e);
    } */
  }

  render() {
    return (
      <Button block onClick={this.handleClick} disabled={this.props.isLoading}>
        Login with Facebook
      </Button>
    );
  }
}

FacebookButton.propTypes = {
  onLogin: PropTypes.func,
  isLoading: PropTypes.bool,
};
