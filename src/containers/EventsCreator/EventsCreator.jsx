import React from 'react'
import './EventsCreator.scss'
import {compose} from "redux"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import Events from "./Events";
import {eventsFetch} from "../../redux/actions/userActions";

class EventsCreator extends React.Component {

    render() {
        return <Events date={this.props.date}
                       time={this.props.time}
                       eventsFetch={this.props.eventsFetch}
        />
    }
}

let mapStateToProps = state => ({
    date: state.events.date,
    time: state.events.time,
})

let  mapDispatchToProps = dispatch => ({
  eventsFetch: (event, userConfig) => dispatch(eventsFetch(event, userConfig))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(EventsCreator)
