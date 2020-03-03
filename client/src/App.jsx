import React from 'react';
import './App.css';
import {connect} from "react-redux";

import {tokensFetchData} from "./redux/actions/tokens";


class App extends React.Component {

    componentDidMount() {
        this.props.fetchData("/api/token")
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.tokens.map((tokens, index) => {
                        return <li key={index}>
                            <div>MainID: {tokens._id}</div>
                            <div>ID: {tokens.id}</div>
                            <div>token: {tokens.token}</div>
                            <div>counter: {tokens.counter}</div>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokens: state.tokens
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => {
            dispatch(tokensFetchData(url))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
