import React from 'react'
import './CSS/RecipeCategory.css'
import { useContext } from 'react'
import { ShopContext } from '../context/RecipeContext'
import Recipe from '../components/Recipes/Recipe'

const RecipeCategory = (props) => {
  const {all_recipes} = useContext(ShopContext)
  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
      </div>
      <div className="shopcategory-products">
        {all_recipes.map((item,i)=>{
          if(props.category===item.category){
            return<Recipe className="recipe" key={i} id={item.id} name={item.name} image={item.image}/>
          }
          else {return null;}
        })}
      </div>
    </div>
  )
}

export default RecipeCategory
