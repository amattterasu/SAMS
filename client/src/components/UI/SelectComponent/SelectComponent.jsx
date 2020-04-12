import React from 'react';
import './mySelect.scss'

import { Select } from 'antd';
const { Option } = Select;



const mySelect = props => {

    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <div className='Select'>
            <label htmlFor={htmlFor}>{props.label}</label>
            <Select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}>
                {props.options.map((option, index) => {
                    return (
                        <Option
                            value={option.value}
                            key={option.value + index}>
                            {option.text}
                        </Option>
                    )
                })}
            </Select>
        </div>
    );
};

export default mySelect;