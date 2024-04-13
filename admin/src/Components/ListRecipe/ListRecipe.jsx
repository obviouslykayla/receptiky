import React, { useEffect, useState } from 'react'
import "./ListRecipe.css"
import remove_icon from './velikonocni-cupcaky.jpg'

const ListRecipe = () => {

  const [allrecipes, setAllrecipes] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allrecipes')
    .then((res)=>res.json())
    .then((data)=>{setAllrecipes(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_recipe = async (id)=>{
    await fetch('http://localhost:4000/removerecipe',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-recipe'>
      <h1>All recipes</h1>
      <div className="listrecipes-format-main">
        <p>Recipes</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listrecipes-allrecipes">
        <hr />
{allrecipes.map((recipe, index)=>{
  return <>
  <div key={index} className="listrecipes-format-main listrecipes-format">
    <img src={recipe.image} width="25px" alt="" className="listrecipe-recipe-icon" />
    <p>{recipe.name}</p>
    <p>{recipe.category}</p>
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
