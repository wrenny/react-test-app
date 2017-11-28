import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TaskActionCreators from 'actions/task'
import { header, body, title, desc } from './styles.scss'
import { TaskModal, TaskActions } from 'components'

class Task extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isModalOpen: false,
      complete: props.task.complete || false,
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

  handleTaskDelete = () => {
    this.props.deleteTask(this.props.task._id, this.props.index)
  }

  handleSubmit = (task, e) => {
    e.preventDefault()
    this.props.editTask({
      ...this.props.task,
      ...task
    })
    .then(() => this.handleModalClose())
    .catch((err) => console.error(err))
  }

  handleTaskComplete = () => {
    this.setState({
      ...this.state,
      complete: !this.state.complete,
    })
    this.props.editTask({
      ...this.props.task,
      complete: !this.props.task.complete,
    })
  }

  render () {
    return (
      <div>
        <div className={header}>
          <div className={title}>{this.props.task.title}</div>
        </div>
        <div className={body}>
          <p className={desc}>{this.props.task.desc}</p>
          <TaskActions
            isAuthed={this.props.isAuthed}
            isComplete={this.state.complete}
            handleModalOpen={this.handleModalOpen}
            handleTaskDelete={this.handleTaskDelete}
            handleTaskComplete={this.handleTaskComplete} />
        </div>
        <TaskModal
          isOpen={this.state.isModalOpen}
          closeModal={this.handleModalClose}
          handleSubmit={this.handleSubmit}
          task={this.props.task} />
      </div>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func,
  handleTaskDelete: PropTypes.func,
  handleTaskComplete: PropTypes.func,
}

export default connect(
  ({ User }) => ({ isAuthed: User.isAuthed }),
  (dispatch) => (bindActionCreators(TaskActionCreators, dispatch))
  )(Task)
