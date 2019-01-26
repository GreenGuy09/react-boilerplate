import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
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
);
