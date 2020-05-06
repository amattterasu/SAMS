import React from 'react';
import './Header.scss'
import {NavLink} from "react-router-dom";

import {LogoutOutlined} from '@ant-design/icons';

const Header = () => {
    return (
        <header>
            <div className='headerContainer'>
                <div className='headerContainerMenu'>
                    <div className='headerItem'>
                        <h1><NavLink to='/'>СКП</NavLink></h1>
                    </div>
                    <div className='headerItem'>
                        <NavLink className='headerLink' to='/im'>Главная</NavLink>
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
                <div className='headerItem' >
                    <NavLink to='/'>
                        <LogoutOutlined /> Выйти
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;