const TOKENS_FETCH_DATA_SUCCESS = "TOKENS_FETCH_DATA_SUCCESS";
const TOKENS_UPDATE_DATA_SUCCESS = "TOKENS_UPDATE_DATA_SUCCESS";

export const getTokensDataSuccess = (tokens) => {
    return {
        type: TOKENS_FETCH_DATA_SUCCESS,
        tokens
    }
};

export const updateTokenDataSuccess = (counter) => {
    return {
        type: TOKENS_UPDATE_DATA_SUCCESS,
        counter
    }
};

export const getTokensData = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(tokens => dispatch(getTokensDataSuccess(tokens)))
            .catch(err => err)
    }
};

export const updateTokenData = (url, id, count) => {
    return (dispatch) => {
        fetch(url + id, {
            method: "PUT",
            body: JSON.stringify({
                counter: count + 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response;
            }))
            .then(response => response.json())
            .then(counters => dispatch(updateTokenDataSuccess(counters)))
            .catch(err => err)
    }
}
