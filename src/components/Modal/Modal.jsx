import React, {useState} from 'react';

import {Button} from 'antd'
import './Modal.scss'

const Modal = props => {

  const [person, setPerson] = useState({ firstName: '', lastName: '' });

  const changeHandler = (value, controlName) => {

    const copy = props.values;
    copy[controlName] = value;
    setPerson({...copy});
  };

  const onSubmit = event => {
    event.preventDefault();
  };

  async function onClickHandler(method, id = '') {
    if (person.firstName && person.lastName) {

      try {
        await fetch(`http://localhost:4000/persons/${id}`,
          {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: null,
              firstName: person.firstName,
              lastName: person.lastName
            })
          }
        )
        await props.refreshState();
        await props.setOpen(false);
        await setPerson({})
      } catch (e) {
        props.notify('error', 'Ошибка запроса');
      }
    }
  }

  return (
    <>
      {
        props.isOpen &&
        <div className='modal'>
          <div className='modal__body'>
            <div className='modal__title'>
              {props.title}
            </div>
            <form onSubmit={onSubmit} className='modal__content'>
              <button className='modal__btn' onClick={() => props.setOpen(false)}>Назад к списку</button>

              <input type={props.type}
                     value={props.values.firstName}
                     onChange={event => changeHandler(event.target.value, 'firstName')}
                     placeholder={props.placeholder.firstName}
              />
              <input type={props.type}
                     value={props.values.lastName}
                     onChange={event => changeHandler(event.target.value, 'lastName')}
                     placeholder={props.placeholder.lastName}
              />
              <Button className='modal__btn-primary'
                      type='primary'
                      onClick={() => onClickHandler(props.method, props.id)}
                      htmlType='submit'
              >
                Сохранить</Button>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;