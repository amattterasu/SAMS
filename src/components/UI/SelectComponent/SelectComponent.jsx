import React from 'react'
import './SelectComponent.scss'

import { Select } from 'antd'
const { Option } = Select

const SelectComponent = props => {

    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <div className='Select'>
            <label htmlFor={htmlFor}>{props.label}</label>
            <Select
                id={htmlFor}
                defaultValue={props.value}
                onChange={props.onChange}
                style={props.style}>
                {props.options.map((option, index) => {
                    return (
                        <Option
                            value={option.value}
                            key={option.value + index}>
                            {option.body_of_answers}
                        </Option>
                    )
                })}
            </Select>
        </div>
    )
}

export default SelectComponent