import React from 'react'
import './RelatedProducts.css'
import all_recipes from '../assets/all-recipes'
import Recipe from '../Recipes/Recipe'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {all_recipes.map((item,i)=>{
            return<Recipe key={i} id={item.id} name={item.name} image={item.image}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
