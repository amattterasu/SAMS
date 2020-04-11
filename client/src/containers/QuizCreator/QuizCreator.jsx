import React from 'react';

import './QuizCreator.scss';
import Button from '../../components/Button/Button';
import BlockAuth from '../../components/BlockAuth/BlockAuth';
import {createControl} from '../../form/formFramework';
import Input from "../../components/UI/Input";

const createOptionControl = (number) => {
    return createControl({
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number
        }, {required: true}
    )
}

const createFormControls = () => {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    changeHandler = (value, controlName) => {

    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => this.changeHandler(event.target.value, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Создание теста</h1>
                    <BlockAuth>
                        <form onSubmit={this.submitHandler}>

                            {
                                this.renderControls()
                            }
                            <select></select>

                            <Button type="" onClick={this.addQuestionHandler}>
                                Добавить вопрос
                            </Button>
                            
                            <Button type="primary" onClick={this.createQuizHandler}>
                                Создать тест
                            </Button>
                        </form>
                    </BlockAuth>
                </div>
            </div>
        );
    }
}

export default QuizCreator;