const initialState = {
  tasks: [],
  isLoading: true,
  error: '',
}

export default function Task (state = initialState, action) {
  switch (action.type) {
    case 'FETCHING_TASKS' :
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCHING_TASKS_SUCCESS' :
      return {
        ...state,
        isLoading: false,
        tasks: action.tasks,
      }
    case 'FETCHING_TASKS_FAILURE' :
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case 'UPDATE_TASKS' :
      return {
        ...state,
        tasks: action.tasks,
      }
    default :
      return state
  }
}
