const initialState = {
	date: [],
	time: [],
	qrCode: '',
	test: {},
  eventId: ''
}

const eventsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_DATE':
			return {...state, date: action.payload}
		case 'SET_TIME':
			return {...state, time: [...action.payload]}
		case 'SET_TEST':
			return {...state, test: action.payload}
   case 'SET_EVENT':
    return {...state,
      eventId: action.payload.eventId
     }
		default:
			return state
	}
}

export default eventsReducer