import React, {Component} from 'react'
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from "redux"

import store from "./redux/store"
import {getProfileFetch} from './redux/actions/userActions'

import Auth from './containers/Auth/Auth'

import Personal from "./containers/Personal/PersonalContainer"
import QuizCreator from "./containers/QuizCreator/QuizCreatorContainer"
import QRCreator from "./containers/QR/QRContainer"
import Events from "./containers/Events/Events"
import HeaderContainer from "./containers/HeaderContainer/HeaderContainer"
import EventsCreator from "./containers/EventsCreator/EventsCreator"
import Footer from "./components/Footer/Footer"

import './App.scss'

class App extends Component {

    componentDidMount = () => {
        if (localStorage.accessToken !== 'undefined') {
            this.props.getProfileFetch()
        }
    }

    render() {
        return (
            <div className={'dflex'}>
                <HeaderContainer/>
                <div className={'wrapper'}>
                    <div>
                        <Switch>
                            <Route exact path={["/login", "/signup"]}
                                   render={() => <Auth history={this.props.history}/>}/>
                            <Route exact path='/quiz-creator' render={() => <QuizCreator/>}/>
                            <Route exact path={["/", "/im"]} render={() => <Personal/>}/>
                            <Route exact path="/qr-creator" render={() => <QRCreator/>}/>
                            <Route exact path="/event-creator" render={() => <EventsCreator/>}/>
                            <Route exact path="/events" render={() => <Events/>}/>
                            <Route path='*'
                                   render={() => <h1 style={{textAlign: 'center'}}>Error 404 PAGE NOT FOUND</h1>}/>
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({getProfileFetch: () => dispatch(getProfileFetch())})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(App)

const MainApp = props => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
