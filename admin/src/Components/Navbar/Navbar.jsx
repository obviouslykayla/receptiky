import React from 'react'
import "./Navbar.css"
import navlogo from './velikonocni-cupcaky.jpg'
import navprofile from './velikonocni-cupcaky.jpg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo" width="50px"/>
      <img src={navprofile} alt="" className="nav-profile" width="50px"/>
    </div>
  )
}

export default Navbar
