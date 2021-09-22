import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import './EnterCode.scss'
import {compose} from "redux"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import { addCode } from "../../redux/actions/userActions";


class EnterCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      numInputs: 6,
      separator: '-',
      isDisabled: false,
      hasErrored: false,
      isInputNum: false,
      isInputSecure: false,
      minLength: 0,
      maxLength: 40,
      placeholder: '',
    };
  }

  handleOtpChange = (otp) => {
    this.setState({ otp });
  };

  clearOtp = () => {
    this.setState({ otp: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCode(this.props.events.eventId, this.state.otp);
    this.clearOtp()
    this.props.history.push('/events')
  };

  render() {
    const {
      otp,
      numInputs,
      separator,
      isDisabled,
      hasErrored,
      isInputNum,
      isInputSecure,
      placeholder,
    } = this.state;

    return (
      <div className="container">
        <div className="view">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <p>Введите ключевое слово</p>
              <div className="margin-top--small">
                <OtpInput
                  inputStyle="inputStyle"
                  numInputs={numInputs}
                  isDisabled={isDisabled}
                  hasErrored={hasErrored}
                  errorStyle="error"
                  onChange={this.handleOtpChange}
                  separator={<span>{separator}</span>}
                  isInputNum={isInputNum}
                  isInputSecure={isInputSecure}
                  shouldAutoFocus
                  value={otp}
                  placeholder={placeholder}
                />
              </div>
              <div className="btn-row">
                <button
                  className="btn margin-top--large"
                  type="button"
                  disabled={isDisabled || otp.trim() === ''}
                  onClick={this.clearOtp}
                >
                  Очистить
                </button>
                <button className="btn margin-top--large" disabled={otp.length < numInputs}>
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
})

const mapDispatchToProps = dispatch => ({
  addCode: (id, code) => dispatch(addCode(id, code))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(EnterCode)


