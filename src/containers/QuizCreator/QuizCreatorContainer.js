import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import QuizCreator from "./QuizCreator"
import {quizFetch} from "../../redux/actions/userActions"

class QuizCreatorContainer extends React.Component {
  render() {
    return <QuizCreator quizFetch={this.props.quizFetch}/>
  }
}

let mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  quizFetch: quiz => dispatch(quizFetch(quiz))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(QuizCreatorContainer)