import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import UserSettingsPage from 'containers/UserSettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import AuthenticatedRoute from '../../components/AuthenticatedRoute/AuthenticatedRoute';
import UnauthenticatedRoute from '../../components/UnauthenticatedRoute/UnauthenticatedRoute';

// eslint-disable-next-line react/prop-types
export default ({ childProps }) => (
  <Switch>
    <AuthenticatedRoute
      exact
      path="/"
      component={HomePage}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings"
      component={UserSettingsPage}
      props={childProps}
    />
    <UnauthenticatedRoute
      exact
      path="/login"
      component={LoginPage}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      component={SignUpPage}
      props={childProps}
    />
    <UnauthenticatedRoute
      exact
      path="/login/reset"
      component={ResetPasswordPage}
      props={childProps}
    />
    <Route path="" component={NotFoundPage} />
  </Switch>
);
