import React from 'react'
import {Redirect} from "react-router-dom"

import './QuizCreator.scss'
import BlockAuth from '../../components/BlockAuth/BlockAuth'
import Button from '../../components/Button/Button'
import Input from "../../components/UI/Input/Input"
import SelectComponent from "../../components/UI/SelectComponent/SelectComponent"

import {createControl, validate, validateForm} from '../../form/formFramework'
import Quiz from "../../components/Quiz/Quiz"

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
        body_of_question: createControl({
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
        body_of_test: [],
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false,
        flag: true,
        title: '',

        showQuiz: [
            {
                title: 'test1',
                body_of_test: [{
                    answers: [{
                        body_of_answers: 'Ответ 1',
                        true_or_false: 1
                    },
                        {
                            body_of_answers: 'Ответ 2',
                            true_or_false: 0
                        },
                        {
                            body_of_answers: 'Ответ 3',
                            true_or_false: 0
                        },
                        {
                            body_of_answers: 'Ответ 4',
                            true_or_false: 0
                        }
                    ],
                    body_of_question: 'Вопрос1'
                }
                ]
            },
            {
                title: 'test2',
                body_of_test: [{
                    answers: [{
                        body_of_answers: 'Ответ 1',
                        true_or_false: 1
                    },
                        {
                            body_of_answers: 'Ответ 2',
                            true_or_false: 0
                        },
                        {
                            body_of_answers: 'Ответ 3',
                            true_or_false: 0
                        },
                        {
                            body_of_answers: 'Ответ 4',
                            true_or_false: 0
                        }
                    ],
                    body_of_question: 'Вопрос2'
                }
                ]
            }
        ]
    }

    componentDidMount() {
        const token = localStorage.token;
        if (token) {
            return fetch('', {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Headers': 'Version, Authorization, Content-Type',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `${token}`
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            //showQuiz: result
                        })
                    }
                )
        }
    }

    checkAnswer = id => {
        if (id === this.state.rightAnswerId) {
            return 1
        }
        return 0
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault();
        const body_of_test = this.state.body_of_test.concat()
        //const index = quiz.length + 1, id: index,
        const {body_of_question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            body_of_question: body_of_question.value,
            answers: [
                {body_of_answers: option1.value, true_or_false: this.checkAnswer(option1.id)},
                {body_of_answers: option2.value, true_or_false: this.checkAnswer(option2.id)},
                {body_of_answers: option3.value, true_or_false: this.checkAnswer(option3.id)},
                {body_of_answers: option4.value, true_or_false: this.checkAnswer(option4.id)}
            ]
        }

        body_of_test.push(questionItem)

        this.setState({
            body_of_test,
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
    }

    createQuizHandler = event => {
        event.preventDefault()

        let itemQuiz = {
            title: this.state.title,
            body_of_test: this.state.body_of_test
        }

        this.setState({
            showQuiz: [...this.state.showQuiz, itemQuiz]
        })
        // Для проверки на хосте
        //this.props.quizFetch(itemQuiz)

        this.setState({
            body_of_test: [],
            isFormValid: false,
            flag: !this.state.flag,
            title: ''
        })
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
                        // value={control.value}
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

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: (+event)
        })
    }

    render() {
        if (this.props.isAuth) return <Redirect to={'/login'}/>

        const select = <SelectComponent
            label='Укажите правильный ответ на вопрос'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {body_of_answers: 'Вариант 1', value: 1},
                {body_of_answers: 'Вариант 2', value: 2},
                {body_of_answers: 'Вариант 3', value: 3},
                {body_of_answers: 'Вариант 4', value: 4},
            ]}
            style={{width: 270}}
        />

        return (
            <div className='QuizContainer'>
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
                                        disabled={!this.state.title.trim()}
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
                                                htmlType='submit'
                                                onClick={this.createQuizHandler}
                                                disabled={!this.state.body_of_test.length}>
                                            Создать тест
                                        </Button>
                                    </div>
                                    <span>Всего вопросов: {this.state.body_of_test.length}</span>
                                </form>
                            }
                        </BlockAuth>
                    </div>
                </div>
                <Quiz body_of_test={this.state.showQuiz}/>
            </div>
        )
    }
}

export default QuizCreator