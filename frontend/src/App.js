import React from 'react'; 
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeCategory from './pages/RecipeCategory';
import Recipe from './pages/Recipe';
import LoginSignUp from './pages/LoginSignUp';
import Footer from './components/Footer/Footer';
import CartItems from './components/CartItems/CartItems';
import AddRecipe from './components/AddRecipe/AddRecipe';
import ListRecipe from './components/ListRecipe/ListRecipe';
import EditRecipe from './components/EditRecipe/EditRecipe';
import EditUser from './components/EditUser/EditUser';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sladke' element={<RecipeCategory  category="Sladké"/>}/>
        <Route path='/predkrmy' element={<RecipeCategory  category="Předkrmy"/>}/>
        <Route path='/napoje' element={<RecipeCategory  category="Nápoje"/>}/>
        <Route path='/polevky' element={<RecipeCategory  category="Polévky"/>}/>
        <Route path='/hlavni-chody' element={<RecipeCategory  category="Hlavní chody"/>}/>
        <Route path='/salaty' element={<RecipeCategory category="Saláty"/>}/>
        <Route path='/recipe' element={<Recipe/>}>
          <Route path=':recipeId' element={<Recipe/>}/>
        </Route>
        <Route path="/addrecipe" element={<AddRecipe/>} />
        <Route path="/listrecipes" element={<ListRecipe/>} />
        <Route path='/editrecipe' element={<EditRecipe/>}>
          <Route path=':recipeId' element={<EditRecipe/>}/>
        </Route>
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='/edituser' element={<EditUser/>}/>
        <Route path='/savelater' element={<CartItems/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
