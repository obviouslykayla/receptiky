import React from 'react'
import './RecipeDisplay.css'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'

const RecipeDisplay = (props) => {
    const {recipe}=props; 
    const {saveForLater}= useContext(ShopContext);
    const handleRecipeClick = () => {
      window.location.reload();
    };
  return (<>
    
    <div className='productdisplay'>
    <div className="productdisplay-down">
      <h1>{recipe.name}</h1>
      <p className='productdisplay-category'><span>Kategorie:</span> {recipe.category}</p>
      <p><a href={recipe.source}>Zdroj receptu </a></p>
      <div>
          <div>
              Čas přípravy: {recipe.preparation_time} min
          </div>
          <div>
              Počet porcí: {recipe.servings} 
          </div>
      </div>
      {localStorage.getItem('auth-token')
      ?<button className='button' onClick={()=>{saveForLater(recipe.id);handleRecipeClick()}}>uložit na později</button>
      :<></>
      }
      </div>
      </div>
      <div className='productdisplay'>
            <img src={recipe.image} alt="" />
    </div>
    </>
  )
}

export default RecipeDisplay
