import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthForm, Jumbotron } from 'components'
import * as userActionCreators from 'actions/user'

class LoginContainer extends Component {

  componentWillUnmount = (e) => {
    this.props.clearError()
  }

  submitAuth = (credentials) => {
    this.props.loginAndAuthUser(credentials)
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
            <h1>{'Login'}</h1>
          </Jumbotron>
        </AuthForm>
      </div>
    )
  }
}

LoginContainer.propTypes = {
  error: PropTypes.string.isRequired,
  loginAndAuthUser: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
}

LoginContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

function mapStateToProps (state) {
  return {
    error: state.User.error,
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginContainer)
