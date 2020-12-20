import React from 'react'
import moment from 'moment'

import BlockAuth from "../../components/BlockAuth/BlockAuth"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/Button/Button"
import {createControl, validate, validateForm} from "../../form/formFramework"
import Datepicker from "../../components/Datepicker/DatepickerContainer"
import SelectComponent from "../../components/UI/SelectComponent/SelectComponent"

import {NotificationContainer, NotificationManager} from 'react-notifications'
import QuizCreator from "../QuizCreator/QuizCreator";

import {Modal, Tooltip} from "antd";

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
          NotificationManager.warning(message, title);
          break;
        case 'error':
          NotificationManager.error(message, title);
          break;
      }
    };
  };

  state = {

    showTestsCreate: false,

    visible: false,

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
      comments: createControl({
        label: 'Комментарий',
        errorMessage: 'Заполните поле комментарий!',
        value: ''
      })
    },
    title: '',

    qrCode: {
      label: 'QR-код*',
      value: ''
    },

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

  submitHandler = event => {
    event.preventDefault()

    let checkData;
    this.state.checkMethod === 'qr' ? checkData = this.state.qrCode.value : checkData = this.props.test

    const eventsConfig = {
      title: this.state.formControls.title.value,
      eventType: this.state.eventType,
      location: this.state.formControls.location.value,

      checkMethod: this.state.checkMethod,

      checkData: checkData,

      date: this.props.date[0] || moment().format('YYYY/MM/DD'),
      timeStart: this.props.time[0] || moment().format('HH:mm'),
      timeEnd: this.props.time[1] || moment().add(10, 'minutes').format('HH:mm'),
      comments: this.state.formControls.comments.value,
    }
    let promise = this.state.checkMethod === 'qr' ?
      this.props.eventsFetch(eventsConfig, 'code') :
      this.props.eventsFetch(eventsConfig, 'test')

    promise
      .then(resp => {
        if(resp.ok) {
          this.createNotification('success')( `Событие ${eventsConfig.title} создно`,'Создание события прошло успешно!')
        }
        else {
          this.createNotification('warning')( `Событие ${eventsConfig.title} не создано`,'Заполните обязательные поля!')
        }
      })

    this.setState({
      //eventsInfo: [...this.state.eventsInfo, eventsConfig],
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

  qrCodeHandler = (event) => {
    this.setState({
      qrCode: {
        label: 'QR-код*',
        value: event.target.value
      }
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
      checkMethod: event
    })
  }

  toggleEventToTest = () => {
    this.setState({showTestsCreate: !this.state.showTestsCreate})
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };


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
      <>
        {
          this.state.showTestsCreate
            ?
            <QuizCreator toggleEventToTest={this.toggleEventToTest} />
            : (
              <div className='EventsCreator'>


                <Modal
                  title="Информация о тесте"
                  visible={this.state.visible}
                  onOk={this.hideModal}
                  okText="Ок"
                  onCancel={this.hideModal}
                  cancelText={'Выйти'}
                >
                  {
                   <>
                     <strong>Название теста: {this.props.test?.name}</strong>
                     <br/>
                     <strong>Время на выполнение: {this.props.test?.time_limit} секунд</strong>
                        {
                          this.props.test?.questions?.map((q, i) =>
                            <ul><strong>Вопрос: {q.text}</strong>
                                <li>
                                  {
                                    <ul>
                                      {
                                        q.answers.map((a, idx) =>
                                          <li>{idx + 1}) {a.text} {a.true_false ? ' - ответ' : null}</li>
                                        )
                                      }
                                    </ul>
                                  }
                                </li>
                            </ul>
                          )
                        }
                   </>
                  }
                </Modal>

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
                        this.state.checkMethod === 'qr'
                          ? (
                            <Input
                              label={this.state.qrCode.label}
                              value={this.state.qrCode.value}
                              onChange={this.qrCodeHandler}
                            />
                          )
                          : <Button style={{ marginLeft: '10px' }} onClick={() => this.toggleEventToTest()}>
                            Создать тест
                          </Button>
                      }

                      {
                        this.state.checkMethod === 'test' && this.props.test.name ?
                          <Tooltip title="Посмотреть тест">
                            <div onClick={() => {this.showModal()}} className='testContainer'>
                              <strong>
                                Название созданного теста теста: {this.props.test.name}
                              </strong>
                              <span style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'left'}}>Нажмите, чтобы посмотреть тест</span>
                            </div>
                          </Tooltip>
                          : null
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
      </>
    )
  }
}

export default Events