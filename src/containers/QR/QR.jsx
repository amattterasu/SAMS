import React from 'react'
import './QR.scss'

const QRCode = require('qrcode.react')

const QRCreator = ({idCode, eventsShow})  => {

  const phrase = eventsShow.filter(event => event.id === idCode)

  return (
     <div className='qrcodeContainer'>
        <QRCode
         value={phrase[0].code}
         size={512}
         bgColor={"#ffffff"}
         fgColor={"#000000"}
         level={"L"}
         includeMargin={false}
         renderAs={"svg"}
         imageSettings={{
           src: "",
           x: null,
           y: null,
           height: 24,
           width: 24,
           excavate: true
         }}
        />
    </div>
  )
}

export default QRCreator