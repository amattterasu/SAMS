import React from 'react';
import './Personal.scss';
import {Redirect} from "react-router-dom";

const Personal = props => {

    if (props.isAuth) return <Redirect to={'/login'}/>

    return (
        <section className={'personal'}>
           <h1 style={{ textAlign: "center" }}>Hello world</h1>
        </section>
    );
};

export default Personal;