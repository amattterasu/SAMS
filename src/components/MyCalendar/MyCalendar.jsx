import React, { Component } from "react"
import moment from "moment"

import {Redirect} from "react-router-dom"


class MyCalendar extends Component {
    state = {
        events: []
    }

    render() {

        if (this.props.isAuth) return <Redirect to={'/login'}/>

        return (
            <div className="App">


            </div>
        );
    }
}

export default MyCalendar;
