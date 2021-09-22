export const setDateToStore = date => ({
    type: 'SET_DATE',
    payload: date
})

export const setTimeToStore = date => ({
    type: 'SET_TIME',
    payload: date
})

export const setTest = test => ({
    type: 'SET_TEST',
    payload: test
})

export const spinner = (toggle) => ({
    type: 'spinner',
    payload: toggle
})

export const setEvent = eventId => ({
    type: 'SET_EVENT',
    payload: { eventId }
  })
  