const initialState = {
    firstName: '',
    secondName: '',
    lastName: '',
    role: '',
    email: '',
    token: '',
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, currentUser: action.payload, isAuth: true}
        case 'REG_USER':
            return {...state, currentUser: action.payload}
        case 'LOGIN_USER':
            return {...state,
                firstName: action.payload.first_name,
                secondName: action.payload.second_name,
                lastName:action.payload.last_name,
                role: action.payload.role,
                email: action.payload.email,
                token: action.payload.authentication_token,
                isAuth: true
            }
        case 'LOGOUT_USER':
            return {...state,
                firstName: '',
                secondName: '',
                lastName: '',
                role: '',
                email: '',
                token: '',
                isAuth: false
            }
        default:
            return state
    }
}


export default authReducer