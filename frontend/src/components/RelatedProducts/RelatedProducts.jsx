import React, { useContext } from 'react'
import './RelatedProducts.css'
import Recipe from '../Recipes/Recipe'
import { ShopContext } from '../../context/ShopContext';

const RelatedProducts = (props) => {
  const {recipe}=props; 
  const {all_recipes} = useContext(ShopContext);
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
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
