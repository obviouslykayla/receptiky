import React, { useState } from 'react'
import "./AddRecipe.css"
import upload_area from "../assets/upload.jpg"

const AddRecipe = () => {
  const [image, setImage]=useState(false);
  const [recipeDetails, setRecipeDetails]= useState({
    name: "",
    image: "",
    category: "",
    servings: "",
    ingredients: [],
    preparation_time:"",
    preparation_process: [], 
    source: ""
  })
  const imageHandler = (e)=>{
      setImage(e.target.files[0]);
  } 
  const changeHandler = (e)=>{
    setRecipeDetails({...recipeDetails,[e.target.name]:e.target.value})
  }
  const Add_Recipe = async ()=>{
    let responseData;
    let recipe = { ...recipeDetails};
    recipe.ingredients = ingredients;
    recipe.preparation_process = preparationProcess;

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
  // Separate state for ingredients
  const [ingredients, setIngredients] = useState(['']);

  // Function to handle input change for ingredients
  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  // Function to add a new input field for ingredients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  // Function to remove an input field for ingredients
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  // Separate state for preparation process
  const [preparationProcess, setPreparationProcess] = useState(['']);

  // Function to handle input change for preparation process
  const handlePreparationProcessChange = (index, event) => {
    const newPreparationProcess = [...preparationProcess];
    newPreparationProcess[index] = event.target.value;
    setPreparationProcess(newPreparationProcess);
  };

  // Function to add a new input field for preparation process
  const handleAddPreparationProcess = () => {
    setPreparationProcess([...preparationProcess, '']);
  };

  // Function to remove an input field for preparation process
  const handleRemovePreparationProcess = (index) => {
    const newPreparationProcess = [...preparationProcess];
    newPreparationProcess.splice(index, 1);
    setPreparationProcess(newPreparationProcess);
  };

  return (
    <div className='add-recipe'>
      <div className="addrecipe-name">
        <p>Název receptu</p>
        <input value={recipeDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Název receptu' />
      </div>
      <div className="addrecipe-serving">
        <div className="addrecipe-serving-itemfield">
          <p>Počet porcí</p>
          <input value={recipeDetails.servings} onChange={changeHandler}  type="text" name="servings" placeholder='Počet porcí' />
        </div>
      </div>
      <div className="addrecipe-time">
        <div className="addrecipe-time-itemfield">
          <p>Čas přípravy</p>
          <input value={recipeDetails.preparation_time} onChange={changeHandler} type="text" name="preparation_time" placeholder='Čas přípravy' />
        </div>
      </div>
      <div className="addrecipe-source">
        <div className="addrecipe-time-itemfield">
          <p>Zdroj receptu: </p>
          <input value={recipeDetails.source} onChange={changeHandler} type="text" name="source" placeholder='Zdroj receptu' />
        </div>
      </div>
      <div className="addrecipe-itemfield">
        <p>Kategorie receptu</p>
        <select onChange={changeHandler} name="category" className='addrecipe-selector'>
        <option value=""></option>
          <option value="Sladké">Sladké</option>
          <option value="Předkrmy">Předkrmy</option>
          <option value="Nápoje">Nápoje</option>
          <option value="Polévky">Polévky</option>
          <option value="Hlavní chody">Hlavní chody</option>
          <option value="Saláty">Saláty</option>
        </select>
      </div>
      <div className="addrecipe-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area}  className="addrecipe-thumbnail" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image"  id="file-input" hidden/>
      </div>
    <div className='addrecipe-item'>
      {ingredients.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder='Ingredience'
              value={value}
              onChange={(event) => handleIngredientChange(index, event)}
            />
            {/* Add button to remove input field for ingredients */}
            <button onClick={() => handleRemoveIngredient(index)}>Odstraň pole</button>
            
          </div>
        ))}
        {/* Add button to add new input field for ingredients */}
        <button onClick={handleAddIngredient}>Přidej další ingredience</button>
      </div>
      <div className='addrecipe-item'>
      {preparationProcess.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder='Krok postupu'
              value={value}
              onChange={(event) => handlePreparationProcessChange(index, event)}
            />
            {/* Add button to remove input field for preparation process */}
            <button onClick={() => handleRemovePreparationProcess(index)}>Odstraň pole</button>
          </div>
        ))}
        {/* Add button to add new input field for preparation process */}
        <button onClick={handleAddPreparationProcess}>Přidej další krok postupu</button>
      </div>
      <button onClick={()=>{Add_Recipe()}} className='addrecipe-btn'>Přidej recept</button>

      </div>

  )
}

export default AddRecipe;
