import React from 'react'

import './QuizCreator.scss'
import BlockAuth from '../../components/BlockAuth/BlockAuth'
import Button from '../../components/Button/Button'
import Input from "../../components/UI/Input/Input"
import SelectComponent from "../../components/UI/SelectComponent/SelectComponent"

import {createControl, validate, validateForm} from '../../form/formFramework'
import Quiz from "../../components/Quiz/Quiz"
import {quizFetch} from "../../redux/actions/userActions";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {setTest} from "../../redux/actions/actions";

const createOptionControl = (number) => {
    return createControl({
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым!',
            id: number,
            value: ''
        }, {required: true}
    )
}

const createFormControls = () => {
    return {
        title: createControl({
              label: 'Название теста*',
              errorMessage: 'Название не может быть пустым!',
              value: ''
          }, {required: true}),
        questions: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым!',
            value: ''
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {

    state = {
        timeLimit: {
            label: 'Время выполнения (в секундах)',
            value: '180'
        },
        quiz: [],
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false,
        //flag: true,
        title: '',

        showQuiz: []
    }

    componentDidMount() {
    }

    checkAnswer = id => {
        if (id === this.state.rightAnswerId) {
            return 1
        }
        return 0
    }

    submitHandler = event => {
        event.preventDefault()
        console.log(event)
    }

    addQuestionHandler = event => {
        event.preventDefault();

        const quiz = this.state.quiz.concat()
        const {questions, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            name: this.state.formControls.title.value,
            time_limit: this.state.timeLimit.value,
            questions: [
                {
                    text: questions.value,
                    answers: [
                        {text: option1.value, true_false: this.checkAnswer(option1.id)},
                        {text: option2.value, true_false: this.checkAnswer(option2.id)},
                        {text: option3.value, true_false: this.checkAnswer(option3.id)},
                        {text: option4.value, true_false: this.checkAnswer(option4.id)}
                    ]
                }
            ]
        }

        //Кидаю наверх
        this.props.setTest(questionItem)

        //quiz.push(questionItem)

        this.setState({
            quiz,
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false,

        })
        this.props.toggleEventToTest()
    }

    // createQuizHandler = event => {
    //     event.preventDefault()
    //
    //     let itemQuiz = {
    //         quiz: this.state.quiz
    //     }
    //
    //     this.setState({
    //         showQuiz: [...this.state.showQuiz, itemQuiz]
    //     })
    //
    //     //this.props.quizFetch(itemQuiz)
    //
    //     this.setState({
    //         quiz: [],
    //         isFormValid: false,
    //         flag: !this.state.flag,
    //         title: '',
    //     })
    // }

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

    // createTitleQuizHandler = event => {
    //     this.setState({flag: !this.state.flag})
    // }

    // titleChangeHandler = event => {
    //     this.setState({title: event.target.value})
    // }

    timeLimitHandler = (event) => {
        this.setState({
            timeLimit: {
                label: 'Время выполнения (в секундах)',
                value: event.target.value
            }
        })
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
                {body: 'Вариант 1', value: 1},
                {body: 'Вариант 2', value: 2},
                {body: 'Вариант 3', value: 3},
                {body: 'Вариант 4', value: 4},
            ]}
            style={{width: 270}}
        />

        return (
         <>
             <Button style={{ width: '100%'}} onClick={this.props.toggleEventToTest}>
                 Вернуться к созданию события
             </Button>

             <div className='QuizContainer'>
                 <div className='QuizCreator'>
                     <div>
                         <h1>Создание теста</h1>
                         <BlockAuth>
                             {/*{this.state.flag*/}
                             {/*  ?*/}
                             {/*  <div className='containerCreateTitle'>*/}
                             {/*      <h2>Введите название теста</h2>*/}
                             {/*      <Input*/}
                             {/*        onChange={this.titleChangeHandler}*/}
                             {/*      />*/}
                             {/*      <Button*/}
                             {/*        type="primary"*/}
                             {/*        onClick={this.createTitleQuizHandler}*/}
                             {/*        disabled={!this.state.title.trim()}*/}
                             {/*      >*/}
                             {/*          Выбрать название*/}
                             {/*      </Button>*/}
                             {/*  </div>*/}
                             {/*  :*/}
                               <form onSubmit={this.submitHandler}>
                                   <h2>Название теста: {this.state.formControls.title.value}</h2>

                                   {
                                       this.renderControls()
                                   }
                                   {
                                       select
                                   }
                                   <Input
                                     label={this.state.timeLimit.label}
                                     value={this.state.timeLimit.value}
                                     placeholder={'3 минуты по умолчанию'}
                                     onChange={this.timeLimitHandler}
                                   />
                                   <div className='container-btn'>
                                       <Button
                                         type="primary"
                                         onClick={this.addQuestionHandler}
                                         disabled={!this.state.isFormValid}>
                                           Создать тест
                                       </Button>
                                       {/*<Button type="primary"*/}
                                       {/*        htmlType='submit'*/}
                                       {/*        onClick={this.createQuizHandler}*/}
                                       {/*        disabled={!this.state.quiz.length}>*/}
                                       {/*    Создать тест*/}
                                       {/*</Button>*/}
                                   </div>
                                   {/*<span>Всего вопросов: {this.state.quiz.length}</span>*/}
                               </form>
                             {/*}*/}
                         </BlockAuth>
                     </div>
                 </div>
                 {/*<Quiz body={this.state.showQuiz}/>*/}
             </div>
         </>
        )
    }
}

let mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    quizFetch: quiz => dispatch(quizFetch(quiz)),
    setTest: test => dispatch(setTest(test))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(QuizCreator)