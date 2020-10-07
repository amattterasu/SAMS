import React from 'react'
import 'antd/dist/antd.css'
import moment from 'moment'
import {DatePicker} from 'antd'

const {RangePicker} = DatePicker

const Datepicker = props => {

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  const onChangePicker = (date) => {
    if (date) {
      props.setDateToStore(date)
    }
  }

  return (
    <div>
      <RangePicker
        onChange={(_, date) => onChangePicker(date)}
        disabledDate={disabledDate}
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
        }}
        format="MM/DD/YYYY HH:mm:ss"
        placeholder={['Начало', 'Конец']}
      />
    </div>
  )
}

export default Datepicker