import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../../redux/actions/actions';
import classes from './Login.module.css';
import Button from 'react-bootstrap/Button';

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

    render() {
        return (
           <div className={classes.Login}>
               <div>
                   <h1>Авторизация</h1>
                   <form onSubmit={this.handleSubmit} className={classes.LoginForm}>
                       <input type="text"/>
                       <input type="password"/>
                       <Button variant='primary' onClick={this.loginHandler}>Войти</Button>
                       <Button variant='success' onClick={this.regHandler}>Зарегистрироваться</Button>
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