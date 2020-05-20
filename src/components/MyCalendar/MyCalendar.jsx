import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

class MyCalendar extends Component {
    state = {
        events: []
    }

    handleSelect = ({ start, end }) => {
        const title = window.prompt('Введите имя нового события')
        if (title)
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            })
    }

    render() {
        return (
            <div className="App">
                <Calendar
                    selectable
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="week"
                    events={this.state.events}
                    style={{ height: "100vh" }}
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={this.handleSelect}
                />

                {console.log(this.state.events)}
            </div>
        );
    }
}

export default MyCalendar;