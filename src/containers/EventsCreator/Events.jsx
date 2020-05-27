import React from 'react'
import BlockAuth from "../../components/BlockAuth/BlockAuth";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/Button/Button";

class Events extends React.Component {


    submitHandler = event => {

    }

    render() {
        return (
            <div className='Events'>
                <div>
                    <h1>Создание события</h1>
                    <BlockAuth>

                        <form onSubmit={this.submitHandler}>
                            {
                                //this.renderControls()
                            }

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

            </div>
        );
    }
}

export default Events