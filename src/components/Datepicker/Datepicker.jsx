import React, {useState} from 'react'
import 'antd/dist/antd.css'
import moment from 'moment'
import {DatePicker, TimePicker} from 'antd'

const Datepicker = props => {
  const { RangePicker } = TimePicker;

  const onChangePickerDate = (date, param) => {
    if (date && param === 'day')  {
        props.setDateToStore(date)
    }
    if (date && param === 'time')  {
        props.setTimeToStore(date)
    }
  }

  const dateFormat = 'YYYY/MM/DD'
  const timeFormat = 'HH:mm'

  const timeAfter = moment().add(10, 'minutes');

  return (
    <div>

        <DatePicker size={'default'}
           onChange={(_, date) => onChangePickerDate(date, 'day')}
           placeholder={'Выбрать день'}
           showToday={true}
           defaultValue={moment(new Date(), dateFormat)}
        />
        <RangePicker
            onChange={(_, date) => onChangePickerDate(date, 'time')}
            placeholder={['Время от', 'Время до']}
            defaultValue={[moment(new Date(), timeFormat), moment(timeAfter, timeFormat)]}
        />
    </div>
  )
}

export default Datepicker