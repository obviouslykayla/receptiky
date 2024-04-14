import React, { useEffect, useState } from 'react'
import "./ListRecipe.css"
import remove_icon from '../assets/delete.png'
import edit_icon from '../assets/edit.png'
import { Link } from 'react-router-dom'

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
      <h1>Všechny recepty</h1>
      <div className="listrecipes-allrecipes">
  {allrecipes.map((recipe, index)=>{
    return <>
    <div key={index} className="listrecipes-format-main listrecipes-format">
      <img src={recipe.image}  alt="" className="listrecipe-recipe-icon" />
      <p>{recipe.name}</p>
      <Link to='/updaterecipe'><img src={edit_icon} width="25px" alt=""/></Link>
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
