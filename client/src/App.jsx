import React from 'react';
import './App.css';
import {connect} from "react-redux";

import {getTokensData, updateTokenData} from "./redux/actions/tokens";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleCounterIncrement = this.handleCounterIncrement.bind(this);
    }

    componentDidMount() {
        this.props.fetchData("/api/token");
        this.timer = setInterval(() => this.props.fetchData("/api/token"), 2000);
    }

    handleCounterIncrement(i) {
        this.props.updateCounter("/api/token/", this.props.tokens[i]._id, this.props.tokens[i].counter);
        console.log(this.props.tokens[i]._id, this.props.tokens[i].counter)
    }

    componentWillUnmount() {
        this.timer = null;
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.tokens.map((tokens, index) => {
                        return <li key={index}>
                            <div>ID: {tokens.id}</div>
                            <div>MainID: {tokens._id}</div>
                            <div>token: {tokens.token}</div>
                            <div>counter: {tokens.counter}</div>
                            <div>
                                <button onClick={() => this.handleCounterIncrement(index)}>counter++</button>
                            </div>
                            <br/>
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
            dispatch(getTokensData(url))
        },
        updateCounter: (url, id, count) => {
            dispatch(updateTokenData(url, id, count))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
