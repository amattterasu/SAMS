import React from 'react';
import './Personal.scss';
import {Redirect} from "react-router-dom";
import BlockAuth from "../../components/BlockAuth/BlockAuth";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Button from "../../components/Button/Button";
import {renderControls} from "../../utils/utils";

class Personal extends React.Component {

    state = {
        id: this.props.currentUser.id,
        isFormValid: false,
        isEdit: false,
        formControls: {
            firstName: createControl({
                label: 'Имя',
                errorMessage: 'Заполните поле имя!',
                value: this.props.currentUser.firstName
            }, {required: true}),
            secondName: createControl({
                label: 'Фамилия',
                errorMessage: 'Заполните поле фамилия!',
                value: this.props.currentUser.secondName
            }, {required: true}),
            lastName: createControl({
                label: 'Отчество',
                errorMessage: 'Заполните поле отчество!',
                value: this.props.currentUser.lastName
            }, {required: true}),
            role: createControl({
                label: 'Роль',
                errorMessage: 'Заполните поле роль!',
                value: this.props.currentUser.role
            }, {required: true})
        },
        userInfo: {
            firstName: this.props.currentUser.firstName,
            secondName: this.props.currentUser.secondName,
            lastName: this.props.currentUser.lastName,
            role: this.props.currentUser.role
        }
    }

    changeHandler = (value, controlName) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    editHandler = () => {
        this.setState({isEdit: !this.state.isEdit})
    }

    submitHandler = event => {

        event.preventDefault()

        const userConfig = {
            firstName: this.state.formControls.firstName.value,
            secondName: this.state.formControls.secondName.value,
            lastName: this.state.formControls.lastName.value,
            role: this.state.formControls.role.value
        }
        this.props.profileFetch(this.state.id, userConfig)

        this.setState({
            isEdit: !this.state.isEdit,
            userInfo: userConfig,
            isFormValid: false
        })
    }

    render() {

        if (this.props.isAuth) return <Redirect to={'/login'}/>

        return (
            <section className={'personal'}>

                <div>
                    <h1>Профиль</h1>
                    <BlockAuth>
                        {
                            !this.state.isEdit ?
                                <div>
                                    <div className='profileInfo'>
                                        <span>ФИО:  </span> &nbsp;
                                        <span>{this.state.userInfo.secondName}</span>
                                        &nbsp;
                                        <span>{this.state.userInfo.firstName}</span>
                                        &nbsp;
                                        <span>{this.state.userInfo.lastName}</span>
                                    </div>
                                    <div className='profileInfo'>
                                        <span>Роль:</span> &nbsp;
                                        {this.state.userInfo.role}
                                    </div>

                                    <Button type="primary"
                                            onClick={this.editHandler}
                                    >
                                        Редактировать
                                    </Button>

                                </div>
                                :
                                <form onSubmit={this.submitHandler}>
                                    {
                                        renderControls(this.state.formControls)
                                    }


                                    <Button type="primary"
                                            disabled={!this.state.isFormValid}
                                            htmlType='submit'
                                    >
                                        Сохранить
                                    </Button>

                                    <Button onClick={this.editHandler}>
                                        Отменить
                                    </Button>
                                </form>
                        }
                    </BlockAuth>
                </div>
            </section>
        )
    }
}

export default Personal