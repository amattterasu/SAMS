import React from 'react'
import './Events.scss'

import {compose} from "redux"
import {connect} from "react-redux"

import { URL } from '../../constants/const'

import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import BlockAuth from "../../components/BlockAuth/BlockAuth";
import {DeleteOutlined, CloseOutlined, CheckOutlined, SearchOutlined} from '@ant-design/icons';
import {deleteEvent, getEvents, getEventsUser, getVisitorUsers, joinUser} from "../../redux/actions/userActions";
import {Popconfirm, message, Button, Switch, Tooltip, Modal as BaseModal} from 'antd';
import Modal from "../../components/Modal/Modal";
import QR from "../QR/QR";

class Events extends React.Component {

    state = {
      visible: false,
      idCode: '',
      eventsShow: [],
      title: 'Мои события',
      isShowAll: false,
      visitors: [],
      allUsers: [],
      isOpen: false,
      titleModal: 'Участники события'
    }

    componentDidMount() {
      const accessToken = localStorage.accessToken
      if (accessToken) {
        return fetch(`${URL}/events/root`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
          .then(res => res.json())
          .then(
            (result) => {
              result &&
              result.forEach(el => {
                if (el.check_type === 'qr') {
                  el.check_type = 'QR-код'
                }
                if (el.check_type === 'test') {
                  el.check_type = 'Тест'
                }
              })
              this.setState({
                eventsShow: result
              })
            }
          )
      } else {
        this.setState({
          eventsShow: [{checkData: null,
            checkMethod: "qr",
            comments: "1",
            date: "2021/09/22",
            eventType: "lecture",
            id: 1,
            location: "12",
            name: 1,
            timeEnd: "20:49",
            timeStart: "20:39",
            }]
        })
      }
    }

    addEvent() {
      this.props.history.push('/event-creator')
    }

    toggleEvents = () => {
      this.setState({isShowAll: !this.state.isShowAll})

      const url = !this.state.isShowAll ? '' : '/root'

      this.props.getEvents(url)
        .then(res => res.json())
        .then(
          (result) => {
            result &&
            result.forEach(el => {
              if (el.check_type === 'qr') {
                el.check_type = 'QR-код'
              }
              if (el.check_type === 'test') {
                el.check_type = 'Тест'
              }
            })
            this.setState({
              eventsShow: result
            })
          }
        )
    }

    deleteEvent(personId) {
      this.props.deleteEvent(personId)
      message.success('Событие удалено!')
      this.setState({
        eventsShow: this.state.eventsShow.filter(o => o.id !== personId)
      })
    }

    showInfo = (personId) => {
      this.setState({isOpen: true, titleModal: 'Участники события'})
      this.props.getEventsUser(personId)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              allUsers: result.participants
            })
          }
        )
    }

    showVisitors = (personId) => {
    this.setState({isOpen: true, titleModal: 'Проверка посещаемости'})
      this.props.getVisitorUsers(personId)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              visitors: result.visitors
            })
          }
        )
    }

    setOpen = () => {
      this.setState({isOpen: false})
    }

    joinUser = () => {
      this.props.joinUser(this.props.auth.id)
    }

    generateQr = (id) => {
      this.setState({visible: !this.state.visible, idCode: id})
    }

    hideModal = () => {
      this.setState({
        visible: false
      })
    }

    render() {
        return <div className='events'>

          <Modal isOpen={this.state.isOpen}
                 setOpen={this.setOpen}
                 title={this.state.titleModal}
                 allUsers={this.state.allUsers}
                 visitors={this.state.visitors}
                 joinUser={this.joinUser}
                 history={this.props.history}
          />

          <BaseModal
            title='QR-код'
            visible={this.state.visible}
            onOk={this.hideModal}
            okText="Ок"
            onCancel={this.hideModal}
            cancelText={'Выйти'}
            width={1000}
          >
            {
              <QR {...this.state}/>
            }
          </BaseModal>

          <h1>{this.state.isShowAll ? 'Все события' : 'Мои события'}</h1>

           <div className='switchContainer'>
             <span className='switchText'>Показать все события</span>
             <Switch
               checkedChildren={<CheckOutlined />}
               unCheckedChildren={<CloseOutlined />}
               checked={this.state.isShowAll}
               onChange={this.toggleEvents}
             />
           </div>

            <BlockAuth>
              <div className='table'>
                <div className='table__title'>
                  {this.state.isShowAll ? null : <div className='table__item'>Посещаемость</div>}
                  <div className='table__item'>Название события</div>
                  <div className='table__item'>Метод</div>
                  <div className='table__item'>Дата</div>
                  {this.state.isShowAll ? null : <div className='table__item'>Действие</div>}
                </div>
                {
                  this.state.eventsShow.length ? this.state.eventsShow.map(event => {
                    return (
                      <div className='table__row' key={event.id}>
                        {
                          this.state.isShowAll ? null : (
                            <Tooltip title="Посмотреть кто на паре">
                              <Button
                                type="primary"
                                onClick={() => this.showVisitors(event.id)}
                              >
                                Проверка
                                <SearchOutlined />
                              </Button>
                            </Tooltip>
                          )
                        }
                        <Tooltip title="Просмотреть всех участников данного события">
                          <div onClick={() => this.showInfo(event.id)} className='table__item table__item-active'>
                            <span style={{fontSize: '12px', fontStyle: 'italic'}}>Нажмите для просмотра участников</span>
                            <strong>
                              <pre>
                                {/* {event.name.padEnd(35)} */}
                              </pre>
                            </strong>
                          </div>
                        </Tooltip>

                        {
                          event.check_type === 'QR-код'
                            ?
                              (
                                this.state.isShowAll
                                  ?
                                    <div className='table__item'>{event.check_type}</div>
                                  :
                                    <Tooltip title="Сгенерировать QR-код данного события">
                                      <div onClick={() => this.generateQr(event.id)} className='table__item table__item-active'>
                                        <span style={{fontSize: '12px', fontStyle: 'italic'}}>Нажмите для генерации QR-кода</span>
                                        <strong>
                                          <pre>
                                            {event.check_type}
                                          </pre>
                                        </strong>
                                      </div>
                                    </Tooltip>
                              )
                            :
                            <div className='table__item'>{event.check_type}</div>

                        }

                        <div className='table__item'>{event.time_start + ' - ' + event.time_end + ' ' + event.date}</div>
                        {
                          this.state.isShowAll ? null : (
                            <div className='table__btn'>
                              <Popconfirm
                                title="Вы действительно хотите удалить данное событие?"
                                onConfirm={() => this.deleteEvent(event.id)}
                                okText="Удалить"
                                cancelText="Отмена"
                              >
                                <Tooltip title="Удалить данное событие">
                                    <Button  className='table__btn-delete' href="#">
                                      <DeleteOutlined  style={ {color: 'red'} } />
                                    </Button>
                                </Tooltip>
                              </Popconfirm>
                            </div>
                          )
                        }
                      </div>
                    )
                  }) : <div style={{textAlign: 'center', fontSize: '18px', marginTop: '10px', color: '#adadad'}}>
                    Событий пока нет
                  </div>
                }
                <Button
                  className='table__btn-primary'
                  type='primary'
                  onClick={ () => this.addEvent() }
                >
                  Создать событие
                </Button>
              </div>
            </BlockAuth>
        </div>
    }
}

const mapStateToProps = state => ({
  globalState: state,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  deleteEvent: (id) => dispatch(deleteEvent(id)),
  getEvents: (url) => dispatch(getEvents(url)),
  getEventsUser: (id) => dispatch(getEventsUser(id)),
  getVisitorUsers: (id) => dispatch(getVisitorUsers(id)),
  joinUser: (id) => dispatch(joinUser(id))

})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Events)
