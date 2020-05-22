import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import QuizCreator from "./QuizCreator"


class QuizCreatorContainer extends React.Component {
    render() {
        return <QuizCreator />
    }
}

let mapStateToProps = state =>({})

let  mapDispatchToProps = dispatch => ({})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(QuizCreatorContainer)