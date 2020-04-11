import React from 'react';
import './QuizCreator.scss';
import Button from "../../components/Button/Button";
import BlockAuth from "../../components/BlockAuth/BlockAuth";

class QuizCreator extends React.Component {

    state = {
        quiz: [],
        formControls: {
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: ''
        }
    }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    render() {
        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Создание теста</h1>
                    <BlockAuth>
                        <form onSubmit={this.submitHandler}>

                            <input type="text"/>
                            <input type="text"/>
                            <input type="text"/>
                            <input type="text"/>
                            <input type="text"/>
                            <input type="text"/>
                            <select ></select>

                            <Button type="primary" onClick={this.addQuestionHandler}>
                                Добавить вопрос
                            </Button>
                            <Button type="" onClick={this.createQuizHandler}>
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