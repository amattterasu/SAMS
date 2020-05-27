import React from 'react'
import BlockAuth from "../../components/BlockAuth/BlockAuth";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Datepicker from "../../components/Datepicker/DatepickerContainer";
import {renderControls} from "../../utils/utils";

class Events extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            title: createControl({
                label: 'Название',
                errorMessage: 'Заполните поле название!',
                value: ''
            }, {required: true}),
            location: createControl({
                label: 'Место проведения',
                errorMessage: 'Заполните поле место проведения!',
                value: ''
            }, {required: true}),
            qrTitle: createControl({
                label: 'QR-код фраза',
                errorMessage: 'Заполните поле QR-код!',
                value: ''
            }),
           comments: createControl({
                label: 'Комментарий',
                errorMessage: 'Заполните поле комментарий!',
                value: ''
            })
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

    submitHandler = event => {

    }

    render() {
        console.log(this.props.date[0], this.props.date[1])
        return (
            <div className='Events'>
                <div className='Events_createEvent'>
                    <h1>Создание события</h1>
                    <BlockAuth>
                        <form onSubmit={this.submitHandler}>
                            {
                                renderControls(this.state.formControls)
                            }

                            <Datepicker />

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