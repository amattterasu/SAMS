import React from 'react'
import './Events.scss'

import {compose} from "redux"
import {connect} from "react-redux"

import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import BlockAuth from "../../components/BlockAuth/BlockAuth";
import {DeleteOutlined} from '@ant-design/icons';
import {deleteEvent} from "../../redux/actions/userActions";
import { Popconfirm, message, Button } from 'antd';

class Events extends React.Component {

    state = {
      eventsShow: []
    }

    componentDidMount() {
      const accessToken = localStorage.accessToken
      if (accessToken) {
        return fetch('http://207.154.210.81/events/root', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        })
          .then(res => res.json())
          .then(
            (result) => {
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
    }

    addEvent() {
      this.props.history.push('/event-creator')
    }

  // TODO Редактирование
  // editPerson = person => {
  //   setOpen(true);
  //   setTitle('Редактирование сотрудника');
  //   setValues({
  //     firstName: person.firstName,
  //     lastName: person.lastName
  //   });
  //   setMethod('PUT');
  //   setId(person.id);
  // }

    deleteEvent(personId) {
      this.props.deleteEvent(personId)
      message.success('Событие удалено!')
      this.setState({
        eventsShow: this.state.eventsShow.filter(o => o.id !== personId)
      })
    }

    render() {
        return <div className='events'>
            <h1>Мои события</h1>
            <BlockAuth>
              <div className='table'>
                <div className='table__title'>
                  <div className='table__item'>Название события</div>
                  <div className='table__item'>Метод</div>
                  <div className='table__item'>Дата</div>
                  <div className='table__item'>Действие</div>
                </div>
                {
                  this.state.eventsShow.length ? this.state.eventsShow.map(event => {
                    return (
                      <div className='table__row' key={event.id}>

                        <div className='table__item'>{event.name}</div>
                        <div className='table__item'>{event.check_type}</div>
                        <div className='table__item'>{event.time_start + ' - ' + event.time_end + ' ' + event.date}</div>
                        <div className='table__btn'>
                          {/* TODO Замутить редактирование*/}
                          {/*<Button*/}
                          {/*  //onClick={() => editPerson(person)}*/}
                          {/*>*/}
                          {/*  <EditTwoTone/>*/}
                          {/*</Button>*/}
                          <Popconfirm
                            title="Вы действительно хотите удалить данное событие?"
                            onConfirm={() => this.deleteEvent(event.id)}
                            okText="Удалить"
                            cancelText="Отмена"
                          >
                            <Button  className='table__btn-delete' href="#">
                              <span >Удалить</span>
                              <DeleteOutlined  style={ {color: 'red'} } />
                            </Button>
                          </Popconfirm>
                        </div>
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

let mapStateToProps = state => ({
    globalState: state
})

let  mapDispatchToProps = dispatch => ({
  deleteEvent: (id) => dispatch(deleteEvent(id)),
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Events)
