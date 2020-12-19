import React from 'react'
import './Events.scss'
import MyCalendar from "../../components/MyCalendar/MyCalendar"
import {compose} from "redux"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"

class Events extends React.Component {
    render() {
        return <MyCalendar></MyCalendar>
    }
}

let mapStateToProps = state => ({})

let  mapDispatchToProps = dispatch => ({})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Events)
