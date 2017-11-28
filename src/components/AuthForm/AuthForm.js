import React, { Component, PropTypes } from 'react'
import { container, form, input, btn, error } from './styles.scss'

class AuthForm extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  authHandler = (e) => {
    e.preventDefault()
    this.props.authHandler(this.state)
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  render () {
    return (
      <div className={container}>
        {this.props.children}
        <form className={form} onSubmit={this.authHandler}>
          <input
            type='email'
            value={this.state.email}
            placeholder='Email'
            onChange={this.handleEmailChange}
            className={input} />
          <input
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={this.handlePasswordChange}
            className={input} />
          <button
            type='submit'
            className={btn}>{'submit'}</button>
          <p className={error}>{this.props.error}</p>
        </form>
      </div>
    )
  }
}

AuthForm.propTypes = {
  authHandler: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default AuthForm
