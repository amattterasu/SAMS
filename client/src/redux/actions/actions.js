const URL = "http://localhost:4000/api/auth";

export const userPostFetch = user => {
    return dispatch => {
        return fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({user})
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
                    //Тут прописываем логику
                } else {
                    localStorage.setItem("token", data.token) // data.token = jwt (simple)
                    dispatch(loginUser(data.user))
                }
            })
            .catch(err => err)
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})