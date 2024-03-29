import React, {Component} from 'react'
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from "redux"

import store from "./redux/store"
import {getProfileFetch} from './redux/actions/userActions'

import Auth from './containers/Auth/Auth'
import Personal from "./containers/Personal/PersonalContainer"
import Events from "./containers/Events/Events"
import HeaderContainer from "./containers/HeaderContainer/HeaderContainer"
import EventsCreator from "./containers/EventsCreator/EventsCreator"
import EnterCode from "./containers/EnterCode/EnterCode"
import Footer from "./components/Footer/Footer"
import './App.scss'
import { Loader } from './components/Loader/Loader'
import { spinner } from './redux/actions/actions'

class App extends Component {
  componentDidMount = () => {
    if (localStorage.accessToken && localStorage.accessToken !== 'undefined') {
       this.props.spinner(true)
       this.props.getProfileFetch()
    }
  }

  render() {
    return (
      <div className={'dflex'}>
        <HeaderContainer/>  
        {this.props.isLoading ? <Loader /> : <div className={'wrapper'}>
            <Switch>
              <Route exact path={["/login", "/signup"]}
                     render={() => <Auth history={this.props.history}/>}/>
              <Route exact path={["/", "/im"]} render={() => <Personal/>}/>
              <Route exact path="/event-creator" render={() => <EventsCreator/>}/>
              <Route exact path="/events"  render={() => <Events history={this.props.history}/>}/>
              <Route exact path="/code"  render={() => <EnterCode history={this.props.history}/>}/>
              <Route path='*'
                     render={() => <h1 style={{textAlign: 'center'}}>Error 404 PAGE NOT FOUND</h1>}/>
            </Switch>
        </div>}
         
          <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  spinner: (toggle) => dispatch(spinner(toggle))
})

const AppContainer = compose(
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
