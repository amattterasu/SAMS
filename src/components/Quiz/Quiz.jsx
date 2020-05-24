import React from 'react'
import './Quiz.scss'
import BlockAuth from "../BlockAuth/BlockAuth";

class Quiz extends React.Component {

    state = {
        quiz: [],
        title: ''
    }

    clickHandler = (el) => {
        this.setState({quiz: el.quiz, title: el.title})
        console.log(el)
    }

    render() {

        const newQuiz = this.props.quiz.map((el, index) => ({title: el.title, quiz: el.quiz, id: index}))

        const quizElements = newQuiz.map(el => <li onClick={() => this.clickHandler(el)}
                                                   key={el.title + Math.random()}>{el.title}</li>)


        return (
            <div className='quiz'>
                <h1>Созданные тесты</h1>
                <BlockAuth>
                    <div className='quizInfoElementContainer'>
                        <ol>
                            {
                                quizElements
                            }
                        </ol>

                        <div className='quizInfo'>
                            <h3>{this.state.title}</h3>
                            {this.state.quiz.map((el, i) =>
                                <div>
                                    <span>{`${i + 1}) ${el.questions}`}</span>
                                    <ul> {el.answers.map(ans => <li>ans.text</li>)} </ul>

                                </div>)}
                        </div>
                    </div>
                </BlockAuth>
            </div>
        )
    }
}

export default Quiz