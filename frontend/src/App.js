import './App.css';
import React from 'react'; 
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Recipe from './pages/Recipe';
import LoginSignUp from './pages/LoginSignUp';
import Footer from './components/Footer/Footer';
import CartItems from './components/CartItems/CartItems';
import AddRecipe from './components/AddRecipe/AddRecipe';
import EditRecipe from './components/EditRecipe/EditRecipe';
import ListRecipe from './components/ListRecipe/ListRecipe';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sladke' element={<ShopCategory  category="Sladké"/>}/>
        <Route path='/predkrmy' element={<ShopCategory  category="Předkrmy"/>}/>
        <Route path='/napoje' element={<ShopCategory  category="Nápoje"/>}/>
        <Route path='/polevky' element={<ShopCategory  category="Polévky"/>}/>
        <Route path='/hlavni-chody' element={<ShopCategory  category="Hlavní chody"/>}/>
        <Route path='/salaty' element={<ShopCategory category="Saláty"/>}/>
        <Route path='/recipe' element={<Recipe/>}>
          <Route path=':recipeId' element={<Recipe/>}/>
        </Route>
        <Route path="/addrecipe" element={<AddRecipe/>} />
        <Route path="/listrecipe" element={<ListRecipe/>} />
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='/savelater' element={<CartItems/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
