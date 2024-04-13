import React from 'react'
import './Newsletter.css'

const Newsletter = () => {
  return (
    <div className='newsletter'>
      <h1>Přihlašte se k newsletteru pro emaily s novými recepty</h1>
      <div>
        <input type="email" placeholder='Your email address' />
      <button>Subscribe</button>
      </div>
    </div>
  )
}

export default Newsletter
