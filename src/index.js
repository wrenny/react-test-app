import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import routes from 'config/routes'
import configureStore from 'store/configureStore.js'
import checkAndAuthCurrentUser from 'actions/user'
import './styles/main.scss'

/* global Stamplay */
Stamplay.init('reacttestapp')

const store = configureStore()

store.dispatch(checkAndAuthCurrentUser())

ReactDOM.render(
  <Provider store={store}>
    {routes()}
  </Provider>,
  document.getElementById('app'))
