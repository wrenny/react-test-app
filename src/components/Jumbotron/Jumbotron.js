import React, { PropTypes } from 'react'
import { jumbotron } from './styles.scss'

export default function Jumbotron (props) {
  return (
    <div className={jumbotron}>
      {props.children}
    </div>
  )
}

Jumbotron.propTypes = {
  children: PropTypes.element.isRequired,
}
