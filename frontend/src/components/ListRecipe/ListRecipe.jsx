import React, { useEffect, useState } from 'react'
import "./ListRecipe.css"
import remove_icon from '../assets/delete.png'
import { Link } from 'react-router-dom'

const ListRecipe = () => {

  const [allrecipes, setAllrecipes] = useState([]);
  const authToken = localStorage.getItem('auth-token');

  const fetchInfo = async () => {
    if (!authToken) return;
    await fetch(`http://localhost:4000/listrecipes`, {
      headers: {
        'auth-token': authToken
      }
    })
      .then((res) => res.json())
      .then((data) => { setAllrecipes(data) });
  }
  

  useEffect(() => {
    fetchInfo();
  }, [authToken]);
  
  const remove_recipe = async (id) => {
    await fetch('http://localhost:4000/removerecipe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify({ id: id })
    });
    await fetchInfo();
  }


  return (
    <div className='list-recipe'>
      <h1>Všechny recepty</h1>
      <div className="listrecipes-allrecipes">
  {allrecipes.map((recipe, index)=>{
    console.log(recipe)
    const recipeId=parseInt(recipe.id);
    return <>
    <div key={index} className="listrecipes-format-main listrecipes-format">
      <img src={recipe.image}  alt="" className="listrecipe-recipe-icon" />
      <p>{recipe.name}</p>
      <Link to={`/editrecipe/${recipe.id}`}>Edit</Link>
<img onClick={()=>{remove_recipe(recipe.id)}} src={remove_icon} width="25px" alt="" className='listrecipe-remove-icon'/>
    </div>
    <hr />
    </>
  })}
      </div>
    </div>
  )
}

export default ListRecipe
