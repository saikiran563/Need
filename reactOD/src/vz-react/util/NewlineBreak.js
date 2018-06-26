import React from 'react'

const NewLineBreak = txt => {
  if (Array.isArray(txt)) {
    return txt.map((item, key) => {
      let txtWithBreak = (
        <span key={key}>
          {item}
          <br />
        </span>
      )
      //console.log('txt = ' + txtWithBreak )
      return (
        <span key={key}>
          {item}
          <br />
        </span>
      )
    })
  }
  return txt
}

export default NewLineBreak
