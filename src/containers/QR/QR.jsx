import React from 'react';
import {Input} from 'antd';
import './QR.scss'
import Button from "../../components/Button/Button";

const QRCode = require('qrcode.react');
const {TextArea} = Input;

class QRCreator extends React.Component {

    state = {
        value: ''
    }

    addQRHandler = event => {
        event.preventDefault()
        console.log(this.state.value)
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return (
            <div className='qrcode'>
                <h1>Генерация QR-кода</h1>

                <div>

                    <form onSubmit={this.addQRHandler}>
                        <TextArea
                            value={this.state.value}
                            style={{width: '400px'}}
                            onChange={this.handleChange}
                            maxLength={23000}
                            placeholder='Введите что-либо для кодирования...'
                        />

                        <div>
                            <QRCode //http://zpao.github.io/qrcode.react/
                                value={this.state.value}
                                size={256}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                                level={"L"}
                                includeMargin={false}
                                renderAs={"svg"}
                                imageSettings={{
                                    src: "",
                                    x: null,
                                    y: null,
                                    height: 24,
                                    width: 24,
                                    excavate: true,
                                }}
                            />
                        </div>



                        <div>
                            <Button type="primary" htmlType="submit" className="login-form-button" size='large'>
                              Отправить на устройства
                            </Button>
                        </div>

                    </form>

                </div>


            </div>
        );
    }
}

export default QRCreator;