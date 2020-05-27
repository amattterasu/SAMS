import React from 'react';
import './Header.scss'
import {NavLink} from "react-router-dom";

import {LogoutOutlined, LoginOutlined} from '@ant-design/icons';

const Header = (props) => {

    return (
        <header>
            <div className='headerContainer'>
                <div className='headerContainerMenu'>
                    <div className='headerItem'>
                        <h1><NavLink to='/im'>СКП</NavLink></h1>
                    </div>
                    <div className='headerItem'>
                        <NavLink className='headerLink' to='/im'>Профиль</NavLink>
                    </div>
                    <div className='headerItem'>
                        <NavLink className='headerLink' to='/quiz-creator'>Создание тестов</NavLink>
                    </div>
                    <div className='headerItem'>
                        <NavLink className='headerLink' to='/qr-creator'>Генерация QR-кода</NavLink>
                    </div>
                    <div className='headerItem'>
                        <NavLink className='headerLink' to='/event-creator'>События</NavLink>
                    </div>
                </div>
                <div className='headerItem'>
                    {props.isAuth
                        ? <div> <div>{props.login} &nbsp;</div> <NavLink onClick={props.logout} to='/login'>
                            <LogoutOutlined/> Выйти
                        </NavLink></div>
                        : <NavLink to={'/login'}> <LoginOutlined /> Войти</NavLink>}
                </div>
            </div>
        </header>
    )
}

export default Header;