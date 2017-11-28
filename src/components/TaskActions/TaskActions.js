import React, { PropTypes } from 'react'
import { icon, actions, complete, check, edit, remove } from './styles.scss'

function TaskActions (props) {
  let isComplete = props.isComplete === true ? complete : 'not'
  return props.isAuthed === true
    ? (
      <div className={actions}>
        <div>
            <i className={`ion-ios-checkmark ${icon} ${check} ${isComplete}`} onClick={props.handleTaskComplete}></i>
            <i className={`ion-ios-compose ${icon} ${edit}`} onClick={props.handleModalOpen}></i>
            <i className={`ion-ios-close ${icon} ${remove}`} onClick={props.handleTaskDelete}></i>
        </div>
      </div>
    )
    : <span></span>
}

TaskActions.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  handleTaskComplete: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  handleTaskDelete: PropTypes.func.isRequired,
}

export default TaskActions
