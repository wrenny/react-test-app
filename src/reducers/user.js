const initialState = {
  isAuthed: false,
  loading: true,
  user: {},
  error: '',
}

export default function User (state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_USER' :
      return {
        ...state,
      }
    case 'AUTH_USER' :
      return {
        ...state,
        isAuthed: true,
        user: action.user,
      }
    case 'UNAUTH_USER' :
      return {
        ...state,
        isAuthed: false,
        user: {},
      }
    case 'FETCHING_USER' :
      return {
        ...state,
        loading: true,
      }
    case 'FETCHING_USER_SUCCESS' :
      return {
        ...state,
        loading: false,
        error: '',
      }
    case 'FETCHING_USER_FAILURE' :
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case 'CLEAR_ERROR' :
      return {
        ...state,
        error: '',
      }
    default :
      return state
  }
}
