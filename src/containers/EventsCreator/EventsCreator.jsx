import React from 'react'
import './EventsCreator.scss'
import {compose} from "redux"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import Events from "./Events";

class EventsCreator extends React.Component {
    render() {
        return <Events date={this.props.date}/>
    }
}

let mapStateToProps = state => ({
    date: state.events.date
})

let  mapDispatchToProps = dispatch => ({})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(EventsCreator)
