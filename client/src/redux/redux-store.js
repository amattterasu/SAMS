import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./reducers/authReducer";
import thunkMiddleware from "redux-thunk";

const reducers = combineReducers({
    auth: authReducer
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.__store__ = store;

export default store;