import React from 'react';
import {Input} from 'antd';
import './QR.scss'
import Button from "../../components/Button/Button";

const QRCode = require('qrcode.react');
const {TextArea} = Input;

class QRCreator extends React.Component {

    state = {
        value: '',
        loadings: []
    }

    enterLoading = index => {
        const newLoadings = [...this.state.loadings];
        newLoadings[index] = true;
        this.setState({
            loadings: newLoadings,
        });
        setTimeout(() => {
            newLoadings[index] = false;
            this.setState({loadings: newLoadings});
        }, 2000);
    };

    addQRHandler = event => {
        event.preventDefault()

        if (this.state.value) {
            console.log(this.state.value)
        }
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        const {loadings} = this.state;
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

                            <Button type="primary"
                                    htmlType="submit"
                                    size='large'
                                    loading={loadings[0]} onClick={() => this.enterLoading(0)}
                            >
                                Отправить на устройствао
                            </Button>
                        </div>

                    </form>

                </div>


            </div>
        );
    }
}

export default QRCreator;