import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthAPI from './auth/auth.api';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    AuthAPI.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute
