import React, { useState } from 'react'
import "./AddRecipe.css"
import upload_area from "./velikonocni-cupcaky.jpg"

const AddRecipe = () => {
  const [image, setImage]=useState(false);
  const [recipeDetails, setRecipeDetails]= useState({
    name:"",
    image:"",
    category:"valorant"
  })
  const imageHandler = (e)=>{
      setImage(e.target.files[0]);
  } 
  const changeHandler = (e)=>{
    setRecipeDetails({...recipeDetails,[e.target.name]:e.target.value})
  }
  const Add_Recipe = async ()=>{
    console.log(recipeDetails);
    let responseData;
    let recipe= recipeDetails;

    let formData = new FormData();
    formData.append('recipe',image);

    await fetch('http://localhost:4000/upload', {
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData
    }).then((resp)=> resp.json()).then((data)=>{responseData=data});

    if(responseData.success){
      recipe.image = responseData.image_url;
      console.log(recipe);
      await fetch('http://localhost:4000/addrecipe',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify(recipe),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Recipe added"):alert("Failed")
        /*redo it so that it doesn just send an alert*/
      })
    }
  }
  return (
    <div className='add-recipe'>
      <div className="addrecipe-itemfield">
        <p>Recipe name</p>
        <input value={recipeDetails.name} onChange={changeHandler} type="text" name="name" placeholder='here motherfucker' />
      </div>
      <div className="addrecipe-serving">
        <div className="addrecipe-serving-itemfield">
          <p>servings</p>
          <input  type="text" name="servings" placeholder='here' />
        </div>
      </div>
      <div className="addrecipe-time">
        <div className="addrecipe-time-itemfield">
          <p>time</p>
          <input type="text" name="time" placeholder='here' />
        </div>
      </div>
      <div className="addrecipe-itemfield">
        <p>recipe category</p>
        <select value={recipeDetails.category} onChange={changeHandler} name="category" className='addrecipe-selector'>
          <option value="valorant">Valorant</option>
        </select>
      </div>
      <div className="addrecipe-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} width="50px" className="addrecipe-thumbnail" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image"  id="file-input" hidden/>
      </div>
      <button onClick={()=>{Add_Recipe()}} className='addrecipe-btn'>Add</button>
    </div>
  )
}

export default AddRecipe
