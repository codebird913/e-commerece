import React from 'react'

const BottonComponent = ({btnName,color}) => {
  return (
    <button style={{backgroundColor: color, color:"white"}}>{btnName}</button>
  )
}

export default BottonComponent