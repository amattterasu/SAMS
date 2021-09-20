const initialState = {
  id: '',
  name: '',
  surname: '',
  patronymic: '',
  group: '',
  email: '',
  isAuth: true,
  accessToken: '',
  isLoading: true
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {...state, currentUser: action.payload, isAuth: true}
    case 'REG_USER':
      return {...state }
    case 'AUTH_ERROR':
      return {...state}
    case 'LOGIN_USER':
      return {...state,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        patronymic:action.payload.patronymic,
        group: action.payload.group,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        isAuth: true,
        isLoading: false
      }
    case 'LOGOUT_USER':
      return {...state,
        name: '',
        surname: '',
        patronymic: '',
        group: '',
        email: '',
        accessToken: '',
        isAuth: false,
      }
    case "spinner": 
      return {
       ...state,
      isLoading: action.payload
    }
    default:
      return state
  }
}

export default authReducer