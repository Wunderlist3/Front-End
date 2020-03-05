import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {
  let text = props.buttonText
  let path = props.pathName

  return (
      <button type={props.type}>{text}</button>
  )
}
export default Button