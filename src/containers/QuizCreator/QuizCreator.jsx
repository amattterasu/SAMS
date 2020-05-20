import React from 'react';

import './QuizCreator.scss';
import BlockAuth from '../../components/BlockAuth/BlockAuth';
import Button from '../../components/Button/Button';
import Input from "../../components/UI/Input/Input";
import SelectComponent from "../../components/UI/SelectComponent/SelectComponent";

import {createControl, validate, validateForm} from '../../form/formFramework';

const createOptionControl = (number) => {
    return createControl({
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым!',
            id: number
        }, {required: true}
    )
}

const createFormControls = () => {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым!'
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
        rightAnswerId: 1,
        isFormValid: false,
        flag: true,
        title: ''
    }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = event => {
        event.preventDefault();
        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1
        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
    }

    createQuizHandler = event => {
        event.preventDefault()

        this.setState({
            flag: !this.state.flag,
            quiz: this.state.quiz.unshift(this.state.title)
        })
        // let js = JSON.stringify({quiz: this.state.quiz})
        // console.log(js)
        //TODO: SERVER
        console.log(this.state.quiz)
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

    createTitleQuizHandler = event => {
        this.setState({flag: !this.state.flag})
    }

    titleChangeHandler = event => {
        this.setState({title: event.target.value})
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
            rightAnswerId: (+event)
        })
    }

    render() {

        const select = <SelectComponent
            label='Укажите правильный ответ на вопрос'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 'Вариант 1', value: 1},
                {text: 'Вариант 2', value: 2},
                {text: 'Вариант 3', value: 3},
                {text: 'Вариант 4', value: 4},
            ]}
            style={{width: 270}}
        />

        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Создание теста</h1>
                    <BlockAuth>
                        {this.state.flag
                            ?
                            <div className='containerCreateTitle'>
                                <h2>Введите название теста</h2>
                                <Input
                                    onChange={this.titleChangeHandler}
                                />
                                <Button
                                    type="primary"
                                    onClick={this.createTitleQuizHandler}
                                    disabled={!this.state.title}
                                >
                                    Выбрать название
                                </Button>
                            </div>
                            :
                            <form onSubmit={this.submitHandler}>
                                   <h2>Название теста: {this.state.title}</h2>
                                {
                                    this.renderControls()
                                }
                                {
                                    select
                                }

                                <div className='container-btn'>
                                    <Button
                                        onClick={this.addQuestionHandler}
                                        disabled={!this.state.isFormValid}>
                                        Добавить вопрос

                                    </Button>

                                    <Button type="primary"
                                            onClick={this.createQuizHandler}
                                            disabled={!this.state.quiz.length}>
                                        Создать тест
                                    </Button>
                                </div>
                               <span>Всего вопросов: {this.state.quiz.length}</span>
                            </form>
                        }
                    </BlockAuth>
                </div>
            </div>
        );
    }
}

export default QuizCreator;