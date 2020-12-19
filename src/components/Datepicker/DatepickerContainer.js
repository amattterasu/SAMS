import {setDateToStore, setTimeToStore} from "../../redux/actions/actions";
import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Datepicker from "./Datepicker";

class DatepickerContainer extends React.Component {
    render() {
        return <Datepicker setDateToStore={this.props.setDateToStore} setTimeToStore={this.props.setTimeToStore}/>
    }
}

let mapStateToProps = state => ({
    // date: state.events.date,
    // time: state.events.time
})

let  mapDispatchToProps = dispatch => ({
    setDateToStore: date => dispatch(setDateToStore(date)),
    setTimeToStore: date => dispatch(setTimeToStore(date))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(DatepickerContainer)
