import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.scss'
import React from 'react'

const Header = () => {
  return (
    <header className="header">
        <FontAwesomeIcon icon={faGamepad} className="header__icon" />
        <h1 className="header__title">
            Deck Of Cards Game
        </h1>
    </header>
  )
}
export default Header