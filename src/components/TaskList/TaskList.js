import React, { PropTypes } from 'react'
import { Task } from 'components'
import { taskListContainer, taskContainer } from './styles.scss'

export default function TaskList (props) {
  return (
    <ul className={taskListContainer}>
      {props.tasks.map((task, idx) => {
        return (
          <li className={taskContainer} key={idx} >
            <Task task={task} index={idx} />
          </li>
        )
      }
      )}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
}
