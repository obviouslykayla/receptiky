import React from 'react'
import './Footer.css'
import footer_logo from '../assets/logo.jpg'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>RECEPTÍKY</p>
      </div>
      <div className="footer-copyright">
        <hr/>
        <p>Kratochvílová Michaela Copyright @ 2024 - Projekt vytvořen pro TNPW2</p>
      </div>
    </div>
  )
}

export default Footer
