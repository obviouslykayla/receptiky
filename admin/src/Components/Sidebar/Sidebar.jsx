import React from 'react'
import "./Sidebar.css"
import {Link} from "react-router-dom"
import add_recipe_icon from './velikonocni-cupcaky.jpg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addrecipe'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={add_recipe_icon} alt="" width="50px" />
            <p>Add recipe</p>
        </div>
      </Link>
      <Link to={'/listrecipe'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={add_recipe_icon} alt="" width="50px" />
            <p>List recipe</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
