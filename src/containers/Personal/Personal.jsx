import React from 'react';
import './Personal.scss';
import {Redirect} from "react-router-dom";
import BlockAuth from "../../components/BlockAuth/BlockAuth";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Button from "../../components/Button/Button";


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
            isFormValid: true
        })
    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        placeholder={control.value}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                </React.Fragment>
            )
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
            roleName: this.state.formControls.roleName.value
        }
        this.props.profileFetch(this.state.id, userConfig)
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
                                        <span>{this.props.currentUser.secondName}</span>
                                        &nbsp;
                                        <span>{this.props.currentUser.firstName}</span>
                                        &nbsp;
                                        <span>{this.props.currentUser.lastName}</span>
                                    </div>
                                    <div className='profileInfo'>
                                        <span>Роль:</span> &nbsp;
                                        {this.props.currentUser.role}
                                    </div>

                                    <Button type="primary"
                                            onClick={this.editHandler}
                                    >
                                        Редактировать
                                    </Button>

                                </div>
                                :
                                <form onSubmit={this.submitHandler}>
                                    {this.renderControls()}


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