import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import Personal from "./Personal";
import {profileFetch} from "../../redux/actions/userActions";


class PersonalContainer extends React.Component {
    render() {
        return <Personal currentUser={this.props.currentUser} profileFetch={this.props.profileFetch}/>
    }
}

let mapStateToProps = state =>({
    currentUser: state.auth
})

let  mapDispatchToProps = dispatch => ({
    profileFetch: (id, userConfig) => dispatch(profileFetch(id, userConfig))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(PersonalContainer)