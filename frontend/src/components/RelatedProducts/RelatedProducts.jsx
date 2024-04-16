import React, { useContext } from 'react'
import './RelatedProducts.css'
import Recipe from '../Recipes/Recipe'
import { ShopContext } from '../../context/RecipeContext';

const RelatedProducts = (props) => {
  const {recipe}=props; 
  const {all_recipes} = useContext(ShopContext);
  const handleRecipeClick = () => {
    window.location.reload();
  };
  return (
    <div className='relatedproducts'>
      <h1>Podobné recepty</h1>
      <div className="relatedproducts-item" onClick={handleRecipeClick}>
      {all_recipes.map((item, i)=>{
        if(recipe.category===item.category){
            return <Recipe key={i} id={item.id} name={item.name} image={item.image}/>
        }
        else {return null;}
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
