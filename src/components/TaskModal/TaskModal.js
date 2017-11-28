import React, { PropTypes, Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as taskActionCreators from 'actions/task'
import { container, textarea, input, btn, bgCancel, bgSuccess } from './styles.scss'

const modal = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    transition: 'all 0.35s ease-out',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    boxShadow: 'rgba(52, 73, 94, 0.1) 0px 8px 14px 2px, rgba(52, 73, 94, 0) 0px 20px 20px 0px',
    maxHeight: '92vh',
    width: '55%',
    minWidth: '320px',
    maxWidth: '520px',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.5s linear',
  },
}

class TaskModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      task: {
        title: props.task.title || '',
        desc: props.task.desc || '',
      },
    }
  }

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value,
      },
    })
  }

  handleSubmitEdit = (e) => {
    e.preventDefault()
    this.props.editTask(this.state.task)
      .then(() => {
        this.props.closeModal()
      })
      .catch((err) => console.error(err))
  }

  render () {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.props.onModalOpen}
        style={modal}
        shouldCloseOnOverlayClick={true}>
        <button className={`${btn} ${bgCancel}`} onClick={this.props.closeModal}><i className='ion-android-cancel'></i></button>
        <form className={container}>
            <input
              value={this.state.task.title}
              name='title'
              placeholder='Enter a title for you task.'
              onChange={this.handleInputChange}
              className={input} />
            <textarea
              value={this.state.task.desc}
              name='desc'
              placeholder='Enter a description for you task.'
              onChange={this.handleInputChange}
              className={textarea}></textarea>
            <button className={`${btn} ${bgSuccess}`} onClick={this.props.handleSubmit.bind(null, this.state.task)}><i className='ion-checkmark-circled'></i></button>
        </form>
      </Modal>
    )
  }
}

TaskModal.propTypes = {
  task: PropTypes.object.isRequired,
  editTask: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default connect(
  (state) => ({}),
  (dispatch) => (bindActionCreators(taskActionCreators, dispatch))
  )(TaskModal)
