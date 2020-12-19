const initialState = {
    date: [],
    time: [],
    qrCode: ''
}

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {...state, date: action.payload}
        case 'SET_TIME':
            return {...state, time: [...action.payload]}
        default:
            return state
    }
}

export default eventsReducer