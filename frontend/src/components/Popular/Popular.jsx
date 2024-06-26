import React, { useContext } from 'react'
import './Popular.css'
import Recipe from '../Recipes/Recipe'
import { ShopContext } from '../../context/RecipeContext'

const Popular = () => {
  const {all_recipes} = useContext(ShopContext);
  return (
    <div className='popular'>
      <div className="popular-item" >
        {all_recipes.slice(-6).map((item, i)=>{
            return <Recipe key={i} id={item.id} name={item.name} image={item.image}/>
        })}
      </div>
    </div>
  )
}

export default Popular
