import React, { useState, useEffect } from 'react';
import "./EditRecipe.css";
import upload_area from '../assets/velikonocni-cupcaky.jpg'

const EditRecipe = ({ recipeData }) => {
  const [image, setImage] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState({
    name: "",
    image: "",
    category: "",
    servings: "",
    preparation_time:"",
    preparation_process: [], 
    source: ""
  });

  useEffect(() => {
    if (recipeData) {
      setRecipeDetails(recipeData);
    }
  }, [recipeData]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setRecipeDetails({ ...recipeDetails, [e.target.name]: e.target.value });
  };

  const Edit_Recipe = async () => {
    let recipe = { ...recipeDetails };
    recipe.ingredients = ingredients;
    recipe.preparation_process = preparationProcess;

    let responseData;
    let formData = new FormData();
    formData.append('recipe',image);

    await fetch('http://localhost:4000/updaterecipe', {
      method: 'PUT', // or 'PATCH' depending on your API design
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    }).then((resp) => resp.json())
      .then((data) => {
        data.success ? alert("Recipe updated") : alert("Failed");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
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
    <div className='add-recipe'>
    <div className="addrecipe-itemfield">
      <p>Název receptu</p>
      <input value={recipeDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Název receptu' />
    </div>
    <div className="addrecipe-serving">
      <div className="addrecipe-serving-itemfield">
        <p>Počet porcí: </p>
        <input value={recipeDetails.servings} onChange={changeHandler}  type="text" name="servings" placeholder='Počet porcí' />
      </div>
    </div>
    <div className="addrecipe-time">
      <div className="addrecipe-time-itemfield">
        <p>Čas přípravy: </p>
        <input value={recipeDetails.preparation_time} onChange={changeHandler} type="text" name="preparation_time" placeholder='Čas přípravy' />
      </div>
    </div>
    <div className="addrecipe-time">
      <div className="addrecipe-time-itemfield">
        <p>Zdroj receptu: </p>
        <input value={recipeDetails.source} onChange={changeHandler} type="text" name="source" placeholder='Zdroj receptu' />
      </div>
    </div>
    <div className="addrecipe-itemfield">
      <p>Kategorie: </p>
      <select onChange={changeHandler} name="category" className='addrecipe-selector'>
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
        <img src={image?URL.createObjectURL(image):upload_area} width="50px" className="addrecipe-thumbnail" alt="" />
      </label>
      <input onChange={imageHandler} type="file" name="image"  id="file-input" hidden/>
    

    <div>
      {/* Render input fields for ingredients */}
      {ingredients.map((value, index) => (
        <div key={index}>
          <input
            type="text"
            value={value}
            onChange={(event) => handleIngredientChange(index, event)}
          />
          {/* Add button to remove input field for ingredients */}
          <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
        </div>
      ))}
      {/* Add button to add new input field for ingredients */}
      <button onClick={handleAddIngredient}>Add Ingredient</button>
    </div>

    <div>
      {/* Render input fields for preparation process */}
      {preparationProcess.map((value, index) => (
        <div key={index}>
          <input
            type="text"
            value={value}
            onChange={(event) => handlePreparationProcessChange(index, event)}
          />
          {/* Add button to remove input field for preparation process */}
          <button onClick={() => handleRemovePreparationProcess(index)}>Remove</button>
        </div>
      ))}
      {/* Add button to add new input field for preparation process */}
      <button onClick={handleAddPreparationProcess}>Add Preparation Process</button>
    </div>
    <button onClick={()=>{Edit_Recipe()}} className='addrecipe-btn'>Přidej recept</button>
  </div>
      </div>
      </div>
);
}
export default EditRecipe;
