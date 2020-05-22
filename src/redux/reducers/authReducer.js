const initialState = {
    currentUser: {},
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return  {...state, currentUser: action.payload, isAuth: true}
        case 'LOGIN_USER':
            return {...state, currentUser: action.payload, isAuth: true}
        case 'LOGOUT_USER':
            return {...state, currentUser: {}, isAuth: false}
        default:
            return state;
    }
}

export const setAuthUserData = (type = 'SET_USER_DATA', userId, email, login) => ({
    type: type ,
    payload: {userId, email, login}
});

export const logout = () => (dispatch) => {
    dispatch(setAuthUserData('LOGOUT_USER', null, null, null))

}


export default authReducer;