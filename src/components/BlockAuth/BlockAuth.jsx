import React from "react"
import classNames from 'classnames'

import "./BlockAuth.scss"

const BlockAuth = ({children, className}) => {
    return (
        <div className={classNames('block', className)}>
            {children}
        </div>
    )
}

export default BlockAuth