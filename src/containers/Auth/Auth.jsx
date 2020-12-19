import React from 'react'
import './Auth.scss'
import {Route} from "react-router-dom"

import RegisterForm from "../../components/RegisterForm/RegisterForm"
import LoginForm from "../../components/LoginForm/LoginForm"

const Auth = props => {

    return (
        <section className={'auth'}>
            <div className={'auth__content'}>
                <Route exact path={'/login'} render={() => <LoginForm history={props.history}/>}/>
                <Route exact path="/signup" render={() => <RegisterForm history={props.history}/>}/>
            </div>
        </section>
    )
}

export default Auth