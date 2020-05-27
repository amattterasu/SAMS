import React from "react"
import {connect} from "react-redux"
import Header from "../../components/Header/Header";
import {logout} from "../../redux/actions/actions";

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.email
});

export default connect(mapStateToProps, {logout})(HeaderContainer);