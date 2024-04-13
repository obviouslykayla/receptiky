import React from 'react'
import './Preparation_process.css'

const Preparation_process = (props) => {
  const {recipe}=props; 
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Pracovní postup</div>
        </div>
        <div className="descriptionbox-description">
          <ul>
          {recipe.preparation_process.map((item,index)=>{
            return(<li key={index}>{item}</li>)
          })}
          </ul>
        </div>
    </div>
  )
}

export default Preparation_process
