import React from 'react'
import BlockAuth from "../../components/BlockAuth/BlockAuth";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Datepicker from "../../components/Datepicker/DatepickerContainer";

class Events extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      title: createControl({
        label: 'Название*',
        errorMessage: 'Заполните поле название!',
        value: ''
      }, {required: true}),
      location: createControl({
        label: 'Место проведения*',
        errorMessage: 'Заполните поле место проведения!',
        value: ''
      }, {required: true}),
      qrTitle: createControl({
        label: 'QR-код фраза',
        errorMessage: 'Заполните поле QR-код!',
        value: ''
      }),
      comments: createControl({
        label: 'Комментарий',
        errorMessage: 'Заполните поле комментарий!',
        value: ''
      })
    },
    eventsInfo: []
  }

  componentDidMount() {
    const token = localStorage.token;
    if (token) {
      return fetch('http://91.105.146.185:3000/events', {
        method: "GET",
        headers: {
          'Access-Control-Allow-Headers': 'Version, Authorization, Content-Type',
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `${token}`
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              showQuiz: result
            })
          }
        )
    }
  }

  submitHandler = event => {
    event.preventDefault()

    const eventsConfig = {
      title: this.state.formControls.title.value,
      location: this.state.formControls.location.value,
      qr: this.state.formControls.qrTitle.value,
      timeStart: this.props.date[0],
      timeEnd: this.props.date[1],
      comments: this.state.formControls.comments.value
    }

    this.props.eventsFetch(eventsConfig)

    this.setState({
      eventsInfo: [...this.state.eventsInfo, eventsConfig],
      isFormValid: false
    })
  }

  changeHandler = (value, controlName) => {

    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <React.Fragment key={controlName + index}>
          <Input
            placeholder={control.value}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <div className='Events'>
        <div className='Events_createEvent'>
          <h1>Создание события</h1>
          <BlockAuth>
            <form onSubmit={this.submitHandler}>
              {
                this.renderControls()
              }
              <label>Время проведения события</label>
              <Datepicker/>

              <div className='container-btn'>
                <Button type="primary"
                        htmlType='submit'
                        disabled={!this.state.isFormValid}
                >
                  Создать событие
                </Button>
              </div>
            </form>
          </BlockAuth>
        </div>
        <div className='Events_showEvent'>
          <h1>События</h1>
          <BlockAuth>

          </BlockAuth>
        </div>
      </div>
    );
  }
}

export default Events