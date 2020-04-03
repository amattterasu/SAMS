import React, {Component} from 'react';
import {Switch, Route, BrowserRouter, withRouter, Redirect, HashRouter} from 'react-router-dom';
import {connect, Provider} from 'react-redux';

import {getProfileFetch, logoutUser} from './redux/actions/actions';
import Auth from './pages/Auth/Auth';
import store from "./redux/redux-store";
import {compose} from "redux";
import Home from "./pages/Home/Home";

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
            <div className={'wrapper'}>
                <Route exact path={["/", "/login", "/signup"]} render={() => <Auth/>}/>
                <Route exact path="/im" render={() => <Home/>}/>
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
    return <BrowserRouter >
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;
