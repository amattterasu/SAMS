import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import Personal from "./Personal";


class PersonalContainer extends React.Component {
    render() {
        return <Personal />
    }
}

let mapStateToProps = state =>({})

let  mapDispatchToProps = dispatch => ({})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(PersonalContainer)