import React from 'react'
import './IngredientsBox.css'

const IngredientsBox = (props) => {
  const {recipe}=props; 
  return (<>
        <div className="ingredients-desc">
          <div className="ingredientsnav-box">Suroviny</div>
              <ul className='ingredientlist'>
              {recipe.ingredients.map((item,index)=>{
                return(<li key={index}>{item}</li>)
              })}
              </ul>
          </div>
          <div className="ingredients-desc">
          <div className="ingredientsnav-box">Postup přípravy</div>
            <ul className='ingredientslist'>
            {recipe.preparation_process.map((item,index)=>{
            return(<li className="list" key={index}>{item}</li>)
          })}
            </ul>
          </div>

    </>
  )
}

export default IngredientsBox
