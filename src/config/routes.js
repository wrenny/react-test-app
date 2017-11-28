import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import {
  MainContainer,
  HomeContainer,
  LoginContainer,
  SignupContainer,
} from 'containers'

export default function routes () {
  return (
    <Router history={hashHistory}>
      <Router path='/' component={MainContainer}>
        <Route path='login' component={LoginContainer} />
        <Route path='signup' component={SignupContainer} />
        <IndexRoute component={HomeContainer} />
      </Router>
    </Router>
  )
}
