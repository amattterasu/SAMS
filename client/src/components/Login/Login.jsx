import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import classes from './Login.module.css';

import {userLoginFetch} from '../../redux/actions/actions';

import Button from 'react-bootstrap/Button';
import Input from "../UI/Input";

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.userLoginFetch(this.state)
    }

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    render() {
        return (
           <div className={classes.Login}>
               <div>
                   <h1>Авторизация</h1>
                   <form onSubmit={this.handleSubmit} className={classes.LoginForm}>
                       <Input label={'Адрес электроной почты'} inputType={'text'}/>
                       <Input label={'Пароль'}inputType={'password'}/>
                       <div className={classes.buttons}>
                           <Button className={classes.btnSuccess}
                                   variant='primary'
                                   onClick={this.loginHandler}>Войти</Button>
                           <Link to={'/signup'}>
                               <Button
                                   variant='success'
                                   onClick={this.registerHandler}
                               >Зарегистрироваться</Button>
                           </Link>
                       </div>

                   </form>
               </div>
           </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Login);