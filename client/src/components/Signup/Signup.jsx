import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import classes from "../Login/Login.module.css";

import is from "is_js";
import {userPostFetch} from '../../redux/actions/actions';

import Button from "react-bootstrap/Button";
import Input from "../UI/Input";

class Signup extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Адрес электронной почты',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Длина пароля должна быть больше 6-ти символов',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
            password_confirm: {
                value: '',
                type: 'password',
                label: 'Повторите пароль',
                errorMessage: 'Длина пароля должна быть больше 6-ти символов',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        },
        radioGroup: {
            teacher: true,
            student: false
        }
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.trim().length >= validation.minLength && isValid
        }

        return isValid;
    }

    handleRadio = event => {
        let object = {};
        object[event.target.value] = event.target.checked;

        this.setState({radioGroup: object})
    }

    onHandleChange = (e, controlName) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].value && isFormValid
        })

        this.setState({
            formControls,
            isFormValid
        })
        //console.log(e.target.value)
    }

    registerHandler = () => {

    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.userPostFetch(this.state)
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    touched={control.touched}
                    value={control.value}
                    valid={control.valid}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={e => this.onHandleChange(e, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Login}>
                <div>
                    <h1>Регистрация</h1>
                    <form onSubmit={this.handleSubmit} className={classes.LoginForm}>
                        {
                            this.renderInputs()
                        }

                        <div className={`${classes.roleGroup}`}>
                            <h2>Выберите роль</h2>

                            <div className={classes.role}>
                                <Input type={'radio'}
                                       label={'Преподаватель'}
                                       value={'teacher'}
                                       name={'role'}
                                       checked={this.state.radioGroup.teacher}
                                       onChange={this.handleRadio}/>
                                <Input type={'radio'}
                                       label={'Студент'}
                                       value={'student'}
                                       name={'role'}
                                       checked={this.state.radioGroup.student}
                                       onChange={this.handleRadio}/>
                            </div>

                        </div>

                        <hr/>
                        <div className={classes.buttons}>
                            <Button className={`${classes.btnSuccess} ${classes.btns}`}
                                    variant='success'
                                    disabled={!this.state.isFormValid}
                                    type={'submit'}>Зарегистрироваться</Button>

                            <Link to={'/login'}>
                                <Button
                                    className={`${classes.btns}`}
                                    variant='primary'
                                    onClick={this.registerHandler}
                                >Авторизоваться</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup);