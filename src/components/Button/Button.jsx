import React from "react"
import { Button as BaseButton} from "antd"
import './Button.css'
import classNames from 'classnames'

const Button = (props) => <BaseButton {...props} className={classNames('button', props.className)} />

export default Button;