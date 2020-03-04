const TOKENS_FETCH_DATA_SUCCESS = "TOKENS_FETCH_DATA_SUCCESS";
const TOKENS_UPDATE_DATA_SUCCESS = "TOKENS_UPDATE_DATA_SUCCESS";

export const getTokensDataSuccess = (tokens) => {
    return {
        type: TOKENS_FETCH_DATA_SUCCESS,
        tokens
    }
};

export const updateTokenDataSuccess = (tokens) => {
    return {
        type: TOKENS_UPDATE_DATA_SUCCESS,
        tokens
    }
}

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
            method: 'PATCH',
            mode: 'CORS',
            body: JSON.stringify({
                count: 111111
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
            .then(tokens => dispatch(updateTokenDataSuccess(tokens)))
            .catch(err => err)
    }
}
