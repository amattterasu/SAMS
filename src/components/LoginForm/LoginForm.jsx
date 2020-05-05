import React from 'react';
import {Form, Input} from "antd";
import {Link} from 'react-router-dom'
import Button from "../Button/Button";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import BlockAuth from "../BlockAuth/BlockAuth";

const onFinish = values => {
    console.log('Received values of form: ', values);
};

class LoginForm extends React.Component {
    render() {
        return (
            <div>
                <div className="auth__top">
                    <h2>Авторизация</h2>
                    <p>Войдите в аккаунт</p>
                </div>
                <BlockAuth>
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
                                placeholder="Имя пользователя"
                            />

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

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" size='large'>
                                Войти в аккаунт
                            </Button>
                        </Form.Item>
                        <Link className="auth__register-link" to={'/signup'}>Зарегистрироваться</Link>
                    </Form>
                </BlockAuth>
            </div>
        );
    }
}

export default LoginForm;