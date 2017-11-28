/* global Stamplay */

const tokenName = `${window.location.origin}-jwt`

export function login (credentials) {
  return Stamplay.User.login(credentials)
}

export function signup (credentials) {
  return Stamplay.User.signup(credentials)
}

export function getCurrentUser () {
  return Stamplay.User.currentUser()
}

export function logout () {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem(tokenName)
    resolve()
  })
}
