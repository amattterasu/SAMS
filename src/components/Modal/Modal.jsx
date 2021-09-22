import React from 'react';

import {Button,  Table} from 'antd'
import './Modal.scss'

const Modal = props => {
  const defaultValue = 'Не задано'

  let columns = []
  let data;

  if (props.title === 'Участники события') {
    columns = [
      {
        title: 'Фамилия',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Имя',
        dataIndex: 'surname',
        key: 'surname',
      },
      {
        title: 'Отчество',
        dataIndex: 'patronymic',
        key: 'patronymic',
      },
      {
        title: 'Эл. почта',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Группа',
        key: 'group',
        dataIndex: 'group',
      }]
    data = props.allUsers?.map(el => {
      return {
        name: el.name || defaultValue,
        surname: el.surname || defaultValue,
        patronymic: el.patronymic || defaultValue,
        group: el.group || defaultValue,
        email: el.email
      }
    })
  } else {
    columns = [
      {
        title: 'Фамилия',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Имя',
        dataIndex: 'surname',
        key: 'surname',
      },
      {
        title: 'Отчество',
        dataIndex: 'patronymic',
        key: 'patronymic',
      },
      {
        title: 'Посещение',
        key: 'visitor',
        dataIndex: 'visitor',
      }]

    data = props.visitors?.map(el => {
      return {
        name: el.first_name || 'Иванов',
        surname: el.second_name || 'Иван',
        patronymic: el.middle_name || 'Иванович',
        visitor: el.presence ? 'Присутствует' : 'Отсутствует'
      }
    })
  }

  return (
    <>
      {
        props.isOpen && data &&
        <div className='modal'>
          <div className='modal__body'>
            <div className='modal__title'>
              {props.title}
            </div>
            <Table cellKey={Math.random()} columns={columns} style={{padding: '8px'}} dataSource={data}/>
              <Button className='modal__btn-primary'
                    type='primary'
                    block
                    style={{"width": "98.6%", background: '#4BB543', borderColor: '#4BB543'}}
                    onClick={() => props.joinUser()}
            >
              Записаться на событие</Button>
            <Button className='modal__btn-primary'
                    type='primary'
                    htmlType='submit'
                    onClick={() => props.setOpen(false)}
            >
              Вернуться</Button>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;