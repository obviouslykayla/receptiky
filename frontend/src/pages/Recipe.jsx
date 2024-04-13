import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import RecipeDisplay from '../components/RecipeDisplay/RecipeDisplay'
import IngredientsBox from '../components/IngredientsBox/IngredientsBox'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts'

const Recipe = () => {
  const {recipeId} =useParams();
  const [recipe, setRecipe] = useState();
    const fetchRecipe = async () => {
      try {
        const id=parseInt(recipeId);
        const response = await fetch(`http://localhost:4000/recipe/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };
    useEffect(() => {
    fetchRecipe();
  }, []);
  console.log(recipe)

  if(recipe != undefined){
  return (
    <div>
      <Breadcrumb recipe={recipe}/>
      <RecipeDisplay recipe={recipe}/>
      <IngredientsBox recipe={recipe}/>
      <RelatedProducts recipe={recipe}/>
    </div>
  )
}
  }

export default Recipe
