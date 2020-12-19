const initialState = {
    id: '',
    name: '',
    surname: '',
    patronymic: '',
    group: '',
    email: '',
    isAuth: false,
    accessToken: ''
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
                isAuth: true
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
        default:
            return state
    }
}

export default authReducer