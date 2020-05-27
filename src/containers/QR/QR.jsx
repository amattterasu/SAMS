import React from 'react'
import {Input} from 'antd'
import './QR.scss'
import Button from "../../components/Button/Button"
import BlockAuth from "../../components/BlockAuth/BlockAuth"
import {Redirect} from "react-router-dom"

const QRCode = require('qrcode.react')
const {TextArea} = Input

class QRCreator extends React.Component {

    state = {
        value: '',
        loadings: []
    }

    // enterLoading = index => {
    //     const newLoadings = [...this.state.loadings];
    //     newLoadings[index] = true;
    //     this.setState({
    //         loadings: newLoadings,
    //     });
    //     setTimeout(() => {
    //         newLoadings[index] = false;
    //         this.setState({loadings: newLoadings});
    //     }, 1000);
    // };

    addQRHandler = event => {
        event.preventDefault()

        if (this.state.value) {

        }
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        })
    }

    render() {

        if (this.props.isAuth) return <Redirect to={'/login'}/>

        const {loadings} = this.state

        return (
            <div className='qrcodeContainer'>
                <h1>Генерация QR-кода</h1>
                <BlockAuth>
                    <form className='qrcodeForm' onSubmit={this.addQRHandler}>
                        <div className='formItem'>
                            <TextArea
                                value={this.state.value}
                                style={{width: '400px'}}
                                onChange={this.handleChange}
                                maxLength={23000}
                                placeholder='Введите что-либо для кодирования...'
                            />
                        </div>
                        <div className='formItem'>
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
                        <div className='formItem'>
                            <Button type="primary"
                                    htmlType="submit"
                                    size='large'
                                    loading={loadings[0]}
                                    onClick={() => this.enterLoading(0)}
                                    disabled={!this.state.value.length}>
                                Отправить на устройство
                            </Button>
                        </div>

                    </form>
                </BlockAuth>
            </div>
        );
    }
}

export default QRCreator;