import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import {logger} from "redux-logger"
import authReducer from "./reducers/authReducer"
import eventsReducer from "./reducers/eventsReducer"

const reducers = combineReducers({
    auth: authReducer,
    events: eventsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, logger)
))

window.__store__ = store

export default store