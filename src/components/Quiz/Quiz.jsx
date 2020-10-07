import React from 'react'
import './Quiz.scss'
import BlockAuth from "../BlockAuth/BlockAuth"

class Quiz extends React.Component {

    state = {
      body_of_test: [],
        title: ''
    }

    clickHandler = (el) => {
        this.setState({body_of_test: el.body_of_test, title: el.title})
    }

    render() {

        const newQuiz = this.props.body_of_test.length && this.props.body_of_test.map((el, index) => ({title: el.title, body_of_test: el.body_of_test, id: index}))

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
                            {this.state.body_of_test.map((el, i) =>
                                <div key={Math.random()}>
                                    <span>{`${i + 1}) ${el.body_of_question}`}</span>
                                    <ul> {el.answers.map(ans => <li key={Math.random()}>{ans.body_of_answers}</li>)} </ul>
                                </div>)}
                        </div>
                    </div>
                </BlockAuth>
            </div>
        )
    }
}

export default Quiz