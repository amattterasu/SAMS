import React from 'react';

import './QuizCreator.scss';
import Button from '../../components/Button/Button';
import BlockAuth from '../../components/BlockAuth/BlockAuth';
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

import {createControl} from '../../form/formFramework';

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
        formControls: createFormControls(),
        rightAnswerId: 1
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
                <React.Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {

        const select = <Select
            label='Выберите правильный ответ'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />


        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Создание теста</h1>
                    <BlockAuth>
                        <form onSubmit={this.submitHandler}>

                            {
                                this.renderControls()
                            }
                            {
                                select
                            }
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