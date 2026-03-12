import React from 'react'
import { useState } from 'react'
const About = () => {

    const[color, setColor] = useState('red')

  return (
    <>
    <div>{color}</div>
    <button onClick={()=>setColor('Green')}>Green</button>
    <button onClick={()=>setColor('Blue')}>Blue</button>
    </>
  )
}

export default About