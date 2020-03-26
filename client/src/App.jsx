import React, {Component} from 'react';
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {getProfileFetch, logoutUser} from './redux/actions/actions';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import store from "./redux/redux-store";
import {compose} from "redux";

class App extends Component {
    componentDidMount = () => {
        //this.props.getProfileFetch()
    }

    handleClick = event => {
        event.preventDefault()
        localStorage.removeItem("token")
        this.props.logoutUser()
    }

    render() {
        return (
            <div>
                <h1>React App</h1>
                <Switch>
                    <Route path="/signup"
                           render={() => <Signup/>}/>
                    <Route path="/login"
                           render={() => <Login/>}/>
                </Switch>
                {
                    this.props.currentUser.username
                    ? <button onClick={this.handleClick}>Log Out</button>
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
    //getProfileFetch: () => dispatch(getProfileFetch()),
    logoutUser: () => dispatch(logoutUser())
})


let AppContainer = compose(
    withRouter,
    connect(mapStateToProps , mapDispatchToProps))(App);

const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;
