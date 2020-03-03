const TOKENS_FETCH_DATA_SUCCESS = "TOKENS_FETCH_DATA_SUCCESS";

export const tokensFetchDataSuccess = (tokens) => {
    return {
        type: TOKENS_FETCH_DATA_SUCCESS,
        tokens
    }
};

export const tokensFetchData = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(tokens => dispatch(tokensFetchDataSuccess(tokens)))
    }
};