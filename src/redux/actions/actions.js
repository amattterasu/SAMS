const URL = "http://61bd636c.ngrok.io"

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

const regUser = userObj => ({
    type: 'REG_USER',
    payload: userObj
})

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
})

export const setAuthUserData = (type = 'SET_USER_DATA', userId, email, login) => ({
    type: type,
    payload: {userId, email, login}
});

export const logout = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch(setAuthUserData('LOGOUT_USER'))
}

export const userRegFetch = user => {
    return dispatch => {
        return fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                user: {
                    email: user.email,
                    password: user.password
                }
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
                    localStorage.setItem("token", 'JUST TOKEN')
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
                email: user.username,
                password: user.password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                    //Тут прописываем логику
                } else {
                    localStorage.setItem("token", data.authentication_token) // data.token
                    dispatch(loginUser(data))
                }
            })
    }
}

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(URL + '/user', {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Headers': 'Version, Authorization, Content-Type',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message) {
                        // Будет ошибка если token не дествительный
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data))
                    }
                })
        }
    }
}

export const quizFetch = quiz => {
    console.log(quiz)
    return dispatch => {
        const token = localStorage.token
        if (true) {
            return fetch(URL, {
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    title: quiz.title,
                    quiz: quiz.quiz
                })
            })
        }
    }
}