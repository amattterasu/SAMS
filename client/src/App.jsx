import React, {Component} from 'react';
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
//import {getProfileFetch} from './redux/actions/actions';
import Signup from './components/Signup';
import Login from './components/Login';
import store from "./redux/redux-store";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {compose} from "redux";

class App extends Component {
    componentDidMount = () => {
        // this.props.getProfileFetch()
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/signup"
                           render={() => <Signup/>}/>
                    <Route path="/login"
                           render={() => <Login/>}/>
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    //getProfileFetch: () => dispatch(getProfileFetch())
})


let AppContainer = compose(
    withRouter,
    connect(null, mapDispatchToProps))(App);

const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}> <AppContainer/> </Provider>
    </BrowserRouter>
}

export default MainApp;
