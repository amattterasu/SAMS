import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
// import {connect, Provider} from 'react-redux';
// import {compose} from "redux";

// import store from "./redux/redux-store";
// import {getProfileFetch, logoutUser} from './redux/actions/actions';
import Auth from './pages/Auth/Auth';
import Home from "./pages/Home/Home";

import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QRCreator from "./containers/QR/QR";

import Header from "./components/Header/Header";
import Events from "./containers/Events/Events";

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
                <BrowserRouter>
                    <Header />
                   <div>
                       <Switch>
                           <Route exact path={["/", "/login", "/signup"]} render={() => <Auth/>}/>
                           <Route exact path='/quiz-creator' render={() => <QuizCreator/>}/>
                           <Route exact path="/im" render={() => <Home/>}/>
                           <Route exact path="/qr-creator" render={() => <QRCreator/>}/>
                           <Route exact path="/event-creator" render={() => <Events/>}/>
                       </Switch>
                   </div>
                </BrowserRouter>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     //currentUser: state.auth.currentUser
// })
//
// const mapDispatchToProps = dispatch => ({
//     //getProfileFetch: () => dispatch(getProfileFetch()),
//     //logoutUser: () => dispatch(logoutUser())
// })
//
// let AppContainer = compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps))(App);

export default App

// const MainApp = (props) => {
//     return <BrowserRouter>
//         <AppContainer/>
//     </BrowserRouter>
// }
//
// export default MainApp;

//basename={process.env.PUBLIC_URL}