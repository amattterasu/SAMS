import React from 'react';

import {Link} from 'react-router-dom'
import Button from "../Button/Button";
import {InfoCircleTwoTone, LockOutlined, UserOutlined, MailOutlined} from '@ant-design/icons';

import BlockAuth from "../BlockAuth/BlockAuth";

import {
    Form,
    Input,
    Tooltip,
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 30},
    },
};

const {success} = false;

const RegisterForm = props => {

    const [form] = Form.useForm();
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Моментальная регистрация</p>
            </div>
            <BlockAuth>
                {!success ? (
                        <Form {...formItemLayout}
                              form={form}
                              name="register"
                              onFinish={onFinish}
                              initialValues={{
                                  prefix: '86',
                              }}
                              scrollToFirstError>

                            <Form.Item name="email"
                                       rules={[
                                           {
                                               type: 'email',
                                               message: 'Некорректный адрес E-mail!',
                                           },
                                           {
                                               required: true,
                                               message: 'Пожалуйста, введите адрес электронной почты!',
                                           },
                                       ]}>
                                <Input placeholder="Адрес электронной почты"
                                       prefix={<MailOutlined className="site-form-item-icon"/>}
                                       size="large"/>
                            </Form.Item>

                            <Form.Item name="password"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Пожалуйста, введите пароль!',
                                           },
                                       ]}
                                       hasFeedback>
                                <Input.Password placeholder='Пароль'
                                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                                size="large"/>
                            </Form.Item>

                            <Form.Item name="confirm"
                                       dependencies={['password']}
                                       hasFeedback
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Пожалуйста, повторите пароль!',
                                           },
                                           ({getFieldValue}) => ({
                                               validator(rule, value) {
                                                   if (!value || getFieldValue('password') === value) {
                                                       return Promise.resolve();
                                                   }
                                                   return Promise.reject('Пароли не совпадают!');
                                               },
                                           })]}>
                                <Input.Password placeholder='Повторите пароль'
                                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                                size="large"/>
                            </Form.Item>

                            <Form.Item name="nickname"
                                       rules={[{
                                           required: true,
                                           message: 'Пожалуйста, введите имя пользователя!',
                                           whitespace: true
                                       }]}>
                                <Input placeholder='Имя пользователя'
                                       prefix={<UserOutlined className="site-form-item-icon"/>}
                                       size="large"/>
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className='login-form-button'>
                                Зарегистрироваться
                            </Button>
                            <Link className="auth__register-link" to={'/login'}>Войти в аккаунт</Link>
                        </Form>
                    )
                    :
                    <div className='auth__confirm-block'>
                        <div>
                            <InfoCircleTwoTone style={{fontSize: '50px', color: '#08c'}}/>
                        </div>
                        <h3> Подтверждение аккаунта</h3>
                        <p>На почту или еще куда...</p>
                    </div>
                }
            </BlockAuth>
        </div>
    );
}

export default RegisterForm;

