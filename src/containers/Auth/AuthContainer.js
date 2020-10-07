import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import Auth from "./Auth"

let mapStateToProps = state => ({})

let  mapDispatchToProps = dispatch => ({})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Auth)
