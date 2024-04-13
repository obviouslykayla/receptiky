import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes,Route} from "react-router-dom"
import AddRecipe from '../../Components/AddRecipe/AddRecipe'
import ListRecipe from '../../Components/ListRecipe/ListRecipe'

const Admin = () => {
  return (
    <div className='admin'> 
      <Sidebar/>
      <Routes>
        <Route path='/addrecipe' element={<AddRecipe/>}/>
        <Route path='/listrecipe' element={<ListRecipe/>}/>
      </Routes>
    </div>
  )
}

export default Admin
