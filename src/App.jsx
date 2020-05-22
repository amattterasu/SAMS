import React, {Component} from 'react'
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from "redux"

import store from "./redux/store"
//import {getProfileFetch, logoutUser} from './redux/actions/actions'

import Auth from './pages/Auth/Auth'
import Home from "./pages/Home/Home"

import QuizCreator from "./containers/QuizCreator/QuizCreatorContainer"
import QRCreator from "./containers/QR/QRContainer"
import Events from "./containers/Events/Events"
import HeaderContainer from "./containers/HeaderContainer/HeaderContainer"

class App extends Component {

    // componentDidMount = () => {
    //     //this.props.getProfileFetch()
    // }
    //
    // handleClick = event => {
    //     event.preventDefault()
    //     localStorage.removeItem("token")
    //     this.props.logoutUser()
    // }

    render() {
        return (
            <div className={'wrapper'}>
                <HeaderContainer/>
                <div>
                    <Switch>

                        <Route exact path={["/login", "/signup"]} render={() => <Auth history={this.props.history}/>}/>
                        <Route exact path='/quiz-creator' render={() => <QuizCreator/>}/>
                        <Route exact path={["/", "/im"]} render={() => <Home/>}/>
                        <Route exact path="/qr-creator" render={() => <QRCreator/>}/>
                        <Route exact path="/event-creator" render={() => <Events/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    //currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
    //getProfileFetch: () => dispatch(getProfileFetch()),
    //logoutUser: () => dispatch(logoutUser())
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(App);

const MainApp = props => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp

//basename={process.env.PUBLIC_URL}