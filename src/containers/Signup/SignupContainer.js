import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthForm, Jumbotron } from 'components'
import * as userActionCreators from 'actions/user'

class SignupContainer extends Component {

  componentWillUnmount = (e) => {
    this.props.clearError()
  }

  submitAuth = (credentials) => {
    this.props.signupAndAuthUser(credentials)
      .then((err) => {
        if (err) return
        this.context.router.replace('/')
      })
  }

  render = () => {
    return (
      <div>
        <AuthForm
          authHandler={this.submitAuth}
          error={this.props.error}>
          <Jumbotron>
            <h1>{'Signup'}</h1>
          </Jumbotron>
        </AuthForm>
      </div>
    )
  }
}

SignupContainer.propTypes = {
  error: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired,
  signupAndAuthUser: PropTypes.func.isRequired,
}

SignupContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(
    (state) => ({error: state.User.error}),
    (dispatch) => (bindActionCreators(userActionCreators, dispatch))
  )(SignupContainer)
