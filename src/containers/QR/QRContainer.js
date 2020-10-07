import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import QR from "./QR"


class QRContainer extends React.Component {
    render() {
        return <QR />
    }
}

let mapStateToProps = state =>({})

let  mapDispatchToProps = dispatch => ({

})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(QRContainer)