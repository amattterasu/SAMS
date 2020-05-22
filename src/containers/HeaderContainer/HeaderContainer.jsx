import React from "react"
import {connect} from "react-redux"
import Header from "../../components/Header/Header";
import {logout} from "../../redux/reducers/authReducer";

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.currentUser.username
});

export default connect(mapStateToProps, {logout})(HeaderContainer);