import React from 'react'
import BlockAuth from "../../components/BlockAuth/BlockAuth";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/Button/Button";
import {createControl} from "../../form/formFramework";
import Datepicker from "../../components/Datepicker/Datepicker";

class Events extends React.Component {

    // state = {
    //     id: this.props.currentUser.id,
    //     isFormValid: false,
    //     isEdit: false,
    //     formControls: {
    //         title: createControl({
    //             label: 'Имя',
    //             errorMessage: 'Заполните поле имя!',
    //             value: this.props.currentUser.firstName
    //         }, {required: true}),
    //         location: createControl({
    //             label: 'Фамилия',
    //             errorMessage: 'Заполните поле фамилия!',
    //             value: this.props.currentUser.secondName
    //         }, {required: true}),
    //         qrTitle: createControl({
    //             label: 'Отчество',
    //             errorMessage: 'Заполните поле отчество!',
    //             value: this.props.currentUser.lastName
    //         }, {required: true}),
    //         timeStart: createControl({
    //             label: 'Роль',
    //             errorMessage: 'Заполните поле роль!',
    //             value: this.props.currentUser.role
    //         }, {required: true})
    //     },
    // }



    submitHandler = event => {

    }

    render() {
        return (
            <div className='Events'>
                <div className='Events_createEvent'>
                    <h1>Создание события</h1>
                    <BlockAuth>
                        <form onSubmit={this.submitHandler}>
                            <Datepicker/>

                            <div className='container-btn'>
                                <Button type="primary"
                                        htmlType='submit'
                                    //disabled={!this.state.quiz.length}
                                >
                                    Создать событие
                                </Button>
                            </div>
                        </form>
                    </BlockAuth>
                </div>
                <div className='Events_showEvent'>
                    <h1>События</h1>
                    <BlockAuth>

                    </BlockAuth>
                </div>





            </div>
        );
    }
}

export default Events