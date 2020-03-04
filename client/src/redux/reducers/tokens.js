const TOKENS_FETCH_DATA_SUCCESS = "TOKENS_FETCH_DATA_SUCCESS";
const TOKENS_UPDATE_DATA_SUCCESS = "TOKENS_UPDATE_DATA_SUCCESS";

export const tokens = (state = [], action) => {
    switch (action.type) {
        case TOKENS_FETCH_DATA_SUCCESS:
            return action.tokens;
        case TOKENS_UPDATE_DATA_SUCCESS:
            return action.tokens;
        default:
            return state;
    }
};