import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from "react-redux"

import {userRegFetch} from "../../redux/actions/userActions"
import BlockAuth from "../BlockAuth/BlockAuth"

import Button from "../Button/Button"
import {InfoCircleTwoTone, LockOutlined, UserOutlined, MailOutlined} from '@ant-design/icons'

import {
    Form,
    Input,
} from 'antd'

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

const RegisterForm = props => {

    const [success, setSuccess] = useState(false)

    const [form] = Form.useForm()
    const onFinish = values => {
        props.userRegFetch(values)
        //console.log('Received values of form: ', values);
        setSuccess(true)
    }

    if (props.isAuth) return <Redirect to={'/im'}/>

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
    )
}

const mapDispatchToProps = dispatch => ({
    userRegFetch: user => dispatch(userRegFetch(user))
})

export default connect(null, mapDispatchToProps)(RegisterForm)

