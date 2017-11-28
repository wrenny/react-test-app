import React, { Component, PropTypes } from 'react'
import { TaskModal } from 'components'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'actions/user'
import * as taskActionCreators from 'actions/task'
import { nav, navUser, navLogo, navGroupRight, navGroupLeft, navGroupBtn } from './styles.scss'

function NavLinks ({isAuthed}) {
  return (
    <ul className={navGroupLeft}>
      <li>
        <Link to='/' className={navLogo}>
          {'Stamplay React Seed'}
        </Link>
      </li>
    </ul>
  )
}

function ActionLinks ({isAuthed, handleLogout, handleModalOpen, user}) {
  return isAuthed === true
    ? <ul className={navGroupRight}>
        <li className={navUser}>{'Hello, '}<strong>{user.email}</strong>{'!'}</li>
        <li className={navGroupBtn} onClick={handleModalOpen}>
          <i className={'ion-plus-circled'}></i>
        </li>
        <li>
          <a className={navGroupBtn} onClick={handleLogout}>{'Logout'}</a>
        </li>
      </ul>
    : <ul className={navGroupRight}>
        <li><Link to='/login' className={navGroupBtn}>{'Login'}</Link></li>
        <li><Link to='/signup' className={navGroupBtn}>{'Signup'}</Link></li>
      </ul>
}

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }
  }

  handleModalOpen = (e) => {
    e.preventDefault()
    if (!this.props.isAuthed) return
    this.setState({
      ...this.state,
      isModalOpen: true,
    })
  }

  handleModalClose = (e = false) => {
    if (e) e.preventDefault()
    this.setState({
      ...this.state,
      isModalOpen: false,
    })
  }

  handleCreateTask = (task, e) => {
    e.preventDefault()
    this.props.taskActions.addTask(task)
    this.handleModalClose()
  }

  render () {
    return (
      <div>
        <nav className={nav}>
          <NavLinks isAuthed={this.props.isAuthed} />
          <ActionLinks
            user={this.props.user}
            isAuthed={this.props.isAuthed}
            handleCreateTask={this.addNewTask}
            handleModalOpen={this.handleModalOpen}
            handleLogout={this.props.userActions.logoutAndUnauthUser} />
        </nav>
        <TaskModal
          task={{}}
          isOpen={this.state.isModalOpen}
          closeModal={this.handleModalClose}
          handleSubmit={this.handleCreateTask} />
      </div>
    )
  }
}

NavLinks.propTypes = ActionLinks.propTypes = Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

Navigation.propTypes = {
  ...Navigation.propTypes,
  userActions: PropTypes.object.isRequired,
}

export default connect(
    (state) => ({ user: state.User.user }),
    (dispatch) => ({
      userActions: bindActionCreators(userActionCreators, dispatch),
      taskActions: bindActionCreators(taskActionCreators, dispatch),
    })
  )(Navigation)
