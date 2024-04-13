import React from 'react'
import './Recipe.css'
import { Link } from 'react-router-dom'

const Recipe = (props) => {
  return (
    <div className='recipe'>
      <Link to={`/recipe/${props.id}`}>
      <img onClick={window.scrollTo(0,0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
    </div>
  )
}

export default Recipe
