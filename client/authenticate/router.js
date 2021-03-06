import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './help'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

modules.export default PrivateRoute
