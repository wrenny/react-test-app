import { login, signup, logout, getCurrentUser } from '../api/user'

function authUser (user) {
  return {
    type: 'AUTH_USER',
    user,
  }
}

function unauthUser () {
  return {
    type: 'UNAUTH_USER',
  }
}

function fetchingUser () {
  return {
    type: 'FETCHING_USER',
  }
}

function fetchingUserSuccess () {
  return {
    type: 'FETCHING_USER_SUCCESS',
  }
}

function fetchingUserFailure (error) {
  return {
    type: 'FETCHING_USER_FAILURE',
    error,
  }
}

export function clearError () {
  return {
    type: 'CLEAR_ERROR',
  }
}

export function loginAndAuthUser (credentials) {
  return function (dispatch) {
    dispatch(fetchingUser())
    return login(credentials).then((user) => {
      dispatch(fetchingUserSuccess())
      dispatch(authUser(user))
    })
    .catch(() => dispatch(fetchingUserFailure('Incorrect email or password.')))
  }
}

export function signupAndAuthUser (credentials) {
  return function (dispatch) {
    dispatch(fetchingUser())
    return signup(credentials).then((user) => {
      dispatch(fetchingUserSuccess())
      dispatch(authUser(user))
    })
    .catch(() => dispatch(fetchingUserFailure('Invalid email or password.')))
  }
}

export function logoutAndUnauthUser () {
  return function (dispatch) {
    return logout().then(() => {
      dispatch(unauthUser())
    })
    .catch(() => console.warn('An error occured during logout.'))
  }
}

export default function checkAndAuthCurrentUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return getCurrentUser().then((user) => {
      if (user.hasOwnProperty('user')) {
        dispatch(fetchingUserSuccess())
        dispatch(authUser(user.user))
      } else {
        dispatch(fetchingUserSuccess())
      }
    })
    .catch((error) => {
      dispatch(fetchingUserFailure(error))
    })
  }
}
