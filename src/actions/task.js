import { getAll, add, update, remove } from '../api/task'

function fetchingTasks () {
  return {
    type: 'FETCHING_TASKS',
    isLoading: true,
  }
}

function fetchingTasksSuccess (tasks) {
  return {
    type: 'FETCHING_TASKS_SUCCESS',
    isLoading: false,
    tasks,
  }
}

function fetchingTasksFailure (error) {
  return {
    type: 'FETCHING_TASKS_FAILURE',
    isLoading: true,
    error,
  }
}

function updateTasks (tasks) {
  return {
    type: 'UPDATE_TASKS',
    tasks,
  }
}

export function fetchTasks () {
  return function (dispatch) {
    dispatch(fetchingTasks)
    return getAll()
      .then(({ data }) => dispatch(fetchingTasksSuccess(data)))
      .catch((err) => dispatch(fetchingTasksFailure(err)))
  }
}

export function addTask (task) {
  return function (dispatch, getState) {
    let tasks = getState().Task.tasks
    return add(task)
      .then((task) => dispatch(updateTasks([...tasks, task])))
      .catch((err) => console.error(err))
  }
}
export function editTask (task) {
  return function (dispatch, getState) {
    let tasks = getState().Task.tasks
    return update(task)
      .then((data) => {
        return dispatch(updateTasks(tasks.map((item, idx, arr) => {
          if (item._id === task._id) return task
          else return item
        })))
      })
      .catch((err) => console.error(err))
  }
}

export function deleteTask (taskId, idx) {
  return function (dispatch, getState) {
    let tasks = getState().Task.tasks
    let updatedTasks = tasks.slice(0, idx).concat(tasks.slice(idx + 1, tasks.length))
    return remove(taskId)
      .then((data) => dispatch(updateTasks(updatedTasks)))
      .catch((err) => console.error(err))
  }
}
