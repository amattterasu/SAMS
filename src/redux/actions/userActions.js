const URL = "http://207.154.210.81"

const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})

const regUser = userObj => ({
  type: 'REG_USER',
  payload: userObj
})

export const setAuthUserData = (type = 'SET_USER_DATA', userId, email, login) => ({
  type: type,
  payload: {userId, email, login}
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('accessToken')
  dispatch(setAuthUserData('LOGOUT_USER'))
}

export const userRegFetch = user => {
  return dispatch => {
    return fetch(URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
      .then((resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText)
        }
        return resp;
      }))
      .then(resp => resp.json())
      .then(data => {   // в случае успеха, data - ответ в JSON
        if (data.message) {
        } else {
          localStorage.removeItem('accessToken')
          dispatch(regUser(data))
        }
      })
      .catch(err => err)
  }
}

export const userLoginFetch = user => {
  return dispatch => {
    return fetch(URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (typeof data === 'string') {
          // TODO Прикрутить notification
          alert('Неправильный логин или пароль')
        } else {
          localStorage.removeItem('accessToken')
          localStorage.setItem("accessToken", data.accessToken)

          if (data.accessToken) {
            dispatch(loginUser(data))
          }
        }
      })
  }
}

export const getProfileFetch = () => {
  return dispatch => {
    const accessToken = localStorage.accessToken;

    if (accessToken) {
      return fetch(URL + `/users`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            localStorage.removeItem('accessToken')
          } else {
            dispatch(loginUser(data))
          }
        })
    }
  }
}

export const quizFetch = quiz => {
  return dispatch => {
    const accessToken = localStorage.accessToken
    if (accessToken) {
      return fetch(URL + '/tests', {
        method: "POST",
        headers: {
          'Access-Control-Allow-Headers': 'Version, Authorization, Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authentication_token: accessToken,
          title: quiz.title,
          time_limit: 10,
          body_of_test: quiz.body_of_test
        })
      })
    }
  }
}

export const eventsFetch = (event, checkData) => {
  return dispatch => {
    const accessToken = localStorage.accessToken
    if (accessToken) {
      return fetch(URL + '/events', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name: event.title,
          type_event: event.eventType,
          location: event.location,
          comments: event.comments,
          date: event.date,
          time_start: event.timeStart,
          time_end: event.timeEnd,
          check_type: event.checkMethod,
          [checkData]: event.checkData
        })
      })
    }
  }
}

export const getEvents = (url) => {
  return dispatch => {
    const accessToken = localStorage.accessToken
    if (accessToken) {
      return fetch(`http://207.154.210.81/events${url}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
    }
  }
}

export const getEventsUser = (id) => {
  return dispatch => {
    const accessToken = localStorage.accessToken
    if (accessToken) {
      return fetch(`http://207.154.210.81/events/${id}/users`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
    }
  }
}

export const getVisitorUsers = (id) => {
  return dispatch => {
    const accessToken = localStorage.accessToken
    if (accessToken) {
      return fetch(`http://207.154.210.81/events/${id}/visitors`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
    }
  }
}


export const profileFetch = (id, userConfig) => {
  return dispatch => {
    const accessToken = localStorage.accessToken;
    if (accessToken) {
      return fetch(URL + `/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name: userConfig.name,
          surname: userConfig.surname,
          patronymic: userConfig.patronymic,
          group: userConfig.group
        })
      })
    }
  }
}

export const deleteEvent = id => {
  return dispatch => {
    const accessToken = localStorage.accessToken
    if (accessToken) {
      return fetch(URL + `/events/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
    }
  }
}
