import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Jumbotron, TaskList } from 'components'
import * as taskActionCreators from 'actions/task'
import { highlight, title } from './styles.scss'

class HomeContainer extends Component {

  componentDidMount = () => {
    this.props.fetchTasks()
  }

  render () {
    return (
      <div>
        <Jumbotron>
          <h1 className={title}>{'A '}<span className={highlight}>{'React.js'}</span>{' & '}<span className={highlight}>{'Stamplay'}</span>{' Starter Kit'}</h1>
        </Jumbotron>
        <TaskList tasks={this.props.tasks} />
      </div>
    )
  }
}

HomeContainer.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
}

export default connect(
    (state) => ({
      tasks: state.Task.tasks,
      isLoading: state.Task.isLoading,
    }),
    (dispatch) => (bindActionCreators(taskActionCreators, dispatch))
  )(HomeContainer)

