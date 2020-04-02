import React from 'react';
import {Form, Input} from "antd";
import {Link} from 'react-router-dom'
import Button from "../Button/Button";
import {UserOutlined, LockOutlined, InfoCircleTwoTone} from '@ant-design/icons';
import BlockAuth from "../BlockAuth/BlockAuth";


const onFinish = values => {
    console.log('Received values of form: ', values);
};

class RegisterForm extends React.Component {
    render() {
        const { success } = false;

        return (
            <div>
                <div className="auth__top">
                    <h2>Регистрация</h2>
                    <p>Моментальная регистрация</p>
                </div>
                <BlockAuth>
                    { !success ? (
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: 'Пожалуйста, введите имя пользователя!'}]}
                            >
                                <Input
                                    size="large"
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    placeholder="Имя пользователя"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Пароль"
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Пароли должны совпадать!'}]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Повторите пароль"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" size='large'>
                                    Зарегистрироваться
                                </Button>
                            </Form.Item>
                            <Link className="auth__register-link" to={'/login'}>Войти в аккаунт</Link>
                        </Form>
                    )
                        :
                        <div className='auth__confirm-block'>
                            <div>
                                <InfoCircleTwoTone  style={{ fontSize: '50px', color: '#08c' }} />
                            </div>
                            <h3> Подтверждение аккаунта</h3>
                            <p>На почту или еще куда...</p>
                        </div>}
                </BlockAuth>
            </div>
        );
    }
}

export default RegisterForm;