import React from 'react'
import moment from 'moment'

import BlockAuth from "../../components/BlockAuth/BlockAuth"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/Button/Button"
import {createControl, validate, validateForm} from "../../form/formFramework"
import Datepicker from "../../components/Datepicker/DatepickerContainer"
import SelectComponent from "../../components/UI/SelectComponent/SelectComponent"

import {NotificationContainer, NotificationManager} from 'react-notifications';


class Events extends React.Component {

  createNotification = (type) => {
    return (message, title) => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success(message, title);
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };

  state = {
    isFormValid: false,
    formControls: {
      title: createControl({
        label: 'Название события*',
        errorMessage: 'Заполните поле название!',
        value: ''
      }, {required: true}),
      location: createControl({
        label: 'Место проведения',
        value: ''
      }),
      qrCode: createControl({
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
    title: '',
    eventsShow: [],
    eventsInfo: [],

    eventType: 'lecture', //по умолчанию леция
    checkMethod: 'qr' // по умолчанию qrCode
  }

  // clickHandler = (el) => {
  //   this.setState({
  //     eventsShow: [{
  //       comments: el.comments,
  //       location: el.location,
  //       qr: el.qr,
  //       timeEnd: el.timeEnd,
  //       timeStart: el.timeStart,
  //       title: el.title
  //     }]
  //   })
  // }

  // componentDidMount() {
  //   const accessToken = localStorage.accessToken
  //   if (accessToken) {
  //     return fetch('http://207.154.210.81/events/root', {
  //       method: "GET",
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         'Authorization': `Bearer ${accessToken}`
  //       },
  //     })
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           this.setState({
  //             eventsShow: result
  //           })
  //         }
  //       )
  //   }
  // }

  submitHandler = event => {
    event.preventDefault()

    const eventsConfig = {
      title: this.state.formControls.title.value,
      eventType: this.state.eventType,
      location: this.state.formControls.location.value,

      checkMethod: this.state.checkMethod,

      qrCode: this.state.formControls.qrCode.value,
      date: this.props.date[0] || moment().format('YYYY/MM/DD'),
      timeStart: this.props.time[0] || moment().format('HH:mm'),
      timeEnd: this.props.time[1] || moment().add(10, 'minutes').format('HH:mm'),
      comments: this.state.formControls.comments.value,
    }

    this.props.eventsFetch(eventsConfig)

    this.setState({
      eventsInfo: [...this.state.eventsInfo, eventsConfig],
      isFormValid: false
    })

    this.createNotification('success')( `Событие ${eventsConfig.title} создно`,'Создание события прошло успешно!')


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

  selectChangeHandler = event => {
    this.setState({
      selectedItem: event
    })
  }

  render() {

   //const eventsElements = this.state.eventsInfo?.map(el => <li onClick={() => this.clickHandler(el)} key={el.title + Math.random()}>{el.title}</li>)

    const selectTypeEvents = <SelectComponent
        label='Тип события'
        value={this.state.eventType}
        onChange={this.selectChangeHandler}
        options={[
          {body: 'Лекция', value: 'lecture'},
          {body: 'Лабораторная работа', value: 'lab'},
          {body: 'Курсовая работа', value: 'coursework'},
          {body: 'Практика', value: 'standard_practice'}
        ]}
        style={{width: 270}}
        styleLabel={{marginTop: '15px'}}
    />

    const selectCheckMethod = <SelectComponent
      label='Способ проверки'
      value={this.state.checkMethod}
      onChange={this.selectChangeHandler}
      options={[
        {body: 'QR-код', value: 'qr'},
        {body: 'Тест', value: 'test'}
      ]}
      style={{width: 270}}
      styleLabel={{marginTop: '15px'}}
      styleContainer={{marginLeft: '10px'}}
    />

    return (
      <div className='Events'>
        <div className='Events_createEvent'>
          <h1>Создание события</h1>
          <NotificationContainer/>
          <BlockAuth>
            <label>Время проведения события</label>
            <Datepicker />
            <form onSubmit={this.submitHandler}>
              {
                selectTypeEvents
              }
              {
                selectCheckMethod
              }
              {
                this.renderControls()
              }
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

        {/*<div className='Events_showEvent'>*/}
        {/*  <h1>События</h1>*/}
        {/*  <BlockAuth>*/}

        {/*    <div className='quizInfoElementContainer'>*/}
        {/*      <ol>*/}
        {/*        {*/}
        {/*          eventsElements*/}
        {/*        }*/}
        {/*      </ol>*/}
        {/*      <div className='quizInfo'>*/}
        {/*        <h3>{this.state.title}</h3>*/}
        {/*        {*/}
        {/*          this.state.eventsShow?.map((el, i) =>*/}
        {/*            <div key={Math.random()}>*/}
        {/*              <h3>{`${i + 1}) ${el.title}`}</h3>*/}
        {/*              <ul>*/}
        {/*                <li>{el.location}</li>*/}
        {/*                <li>{el.qr}</li>*/}
        {/*                <li>{el.timeStart}</li>*/}
        {/*                <li>{el.timeEnd}</li>*/}
        {/*                <li>{el.comments}</li>*/}
        {/*              </ul>*/}
        {/*            </div>)*/}
        {/*        }*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*</BlockAuth>*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default Events