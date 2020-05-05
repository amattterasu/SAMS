import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./reducers/authReducer";
import thunkMiddleware from "redux-thunk";
import {logger} from "redux-logger";

const reducers = combineReducers({
    auth: authReducer
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

const store = createStore(reducers, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware),
    applyMiddleware(logger)
));

window.__store__ = store;

export default store;