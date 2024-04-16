import React, { useState, useEffect } from 'react';
import '../AddRecipe/AddRecipe.css';
import upload_area from "../assets/upload.png"
import { useParams } from 'react-router-dom';

const EditRecipe = () => {
  const [image, setImage] = useState(false);
  const {recipeId} =useParams();
  const authToken = localStorage.getItem('auth-token');
  const [recipeDetails, setRecipeDetails] = useState({
    id: recipeId,
    name: '',
    image: '',
    category: '',
    servings: '',
    ingredients: [],
    preparation_time: '',
    preparation_process: [],
    source: ''
  });
  const [errors, setErrors] = useState({
    preparation_time: '',
    servings: ''
  });

  const [ingredients, setIngredients] = useState(['']);
  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
    setRecipeDetails(prevState => ({
      ...prevState,
      ingredients: newIngredients
    }));
  };
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    const filteredIngredients = newIngredients.filter(item => item !== '');
    setIngredients(filteredIngredients);
    setRecipeDetails(prevState => ({
      ...prevState,
      ingredients: filteredIngredients
    }));
  };

  const [preparationProcess, setPreparationProcess] = useState(['']);
  const handlePreparationProcessChange = (index, event) => {
    const newPreparationProcess = [...preparationProcess];
    newPreparationProcess[index] = event.target.value;
    setPreparationProcess(newPreparationProcess);
    setRecipeDetails(prevState => ({
      ...prevState,
      preparation_process: newPreparationProcess
    }));
  };
  const handleAddPreparationProcess = () => {
    setPreparationProcess([...preparationProcess, '']);
  };
  const handleRemovePreparationProcess = (index) => {
    const newPreparationProcess = [...preparationProcess];
    newPreparationProcess.splice(index, 1);
    const filteredPreparationProcess = newPreparationProcess.filter(item => item !== '');
    setPreparationProcess(filteredPreparationProcess);
    setRecipeDetails(prevState => ({
      ...prevState,
      preparation_process: filteredPreparationProcess
    }));
  };

  
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if(!authToken) return;
      try {
        const response = await fetch(`http://localhost:4000/recipe/${recipeId}`);
        const data = await response.json();
        setRecipeDetails(data);
        setIngredients(data.ingredients);
        setPreparationProcess(data.preparation_process);
        setImage(data.image)
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [authToken]);

  useEffect(() => {
    setImage(recipeDetails.image);
  }, [recipeDetails.image]);

  const imageHandler = async (e) => {
    const formData = new FormData();
    formData.append('recipe', e.target.files[0]);
  
    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setRecipeDetails(prevState => ({
        ...prevState,
        image: data.image
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  


  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'preparation_time' && isNaN(value)) {
      setErrors(prevErrors => ({ ...prevErrors, preparation_time: 'Čas přípravy musí být číslo.' }));
    } else if (name === 'preparation_time' && !isNaN(value)) {
      setErrors(prevErrors => ({ ...prevErrors, preparation_time: '' }));
    }
  
    if (name === 'servings' && isNaN(value)) {
      setErrors(prevErrors => ({ ...prevErrors, servings: 'Počet porcí musí být číslo.' }));
    } else if (name === 'servings' && !isNaN(value)) {
      setErrors(prevErrors => ({ ...prevErrors, servings: '' }));
    }
      setRecipeDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
    }


  const editRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:4000/editrecipe/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify(recipeDetails)
      });
  
      const data = await response.json();
      if (data.success) {

        alert('Recipe updated successfully');
      } else {

        alert('Failed to update recipe: ' + data.error);
      }
    } catch (error) {

      console.error('Error editing recipe:', error);
      alert('An error occurred while editing the recipe. Please try again later.');
    }
  };
  

  return (
    <div className='add-recipe'>
      <div className="addrecipe-item">
        <p>Název receptu</p>
        <input value={recipeDetails.name} onChange={changeHandler} type="text" name="name" placeholder={recipeDetails.name} />
      </div>
      <div className="addrecipe-item">
        <div className={` ${errors.servings ? 'error' : ''}`}>
          <p>Počet porcí</p>
          <input value={recipeDetails.servings} onChange={changeHandler} type="text" name="servings" placeholder={recipeDetails.servings}/>
          {errors.servings && <p className="error-message">{errors.servings}</p>}
        </div>
      </div>
      <div className="addrecipe-item">
        <div className={`${errors.preparation_time ? 'error' : ''}`}>
          <p>Čas přípravy v minutách</p>
          <input value={recipeDetails.preparation_time} onChange={changeHandler} type="text" name="preparation_time" placeholder={recipeDetails.preparation_time} />
          {errors.preparation_time && <p className="error-message">{errors.preparation_time}</p>}
        </div>
      </div>
      <div className="addrecipe-item">
        <div >
          <p>Zdroj receptu </p>
          <input value={recipeDetails.source} onChange={changeHandler} type="text" name="source" placeholder={recipeDetails.source} />
        </div>
      </div>
      <div className="addrecipe-item">
        <p>Kategorie receptu</p>
        <select onChange={changeHandler} name="category" className='addrecipe-selector' value={recipeDetails.category}>
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
    {recipeDetails.image ? (
      <img
        src={image instanceof Blob ? URL.createObjectURL(image) : image}
        className="addrecipe-thumbnail"
        alt=""
      />
    ) : (
      <img
        src={upload_area}
        className="addrecipe-thumbnail"
        alt=""
      />
    )}
  </label>
  <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
</div>
      <div className='addrecipe-item'>
        {ingredients.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`${index+1}`}
              value={value}
              onChange={(event) => handleIngredientChange(index, event)}
            />
            <button onClick={() => handleRemoveIngredient(index)}>Odstraň pole</button>
          </div>
        ))}
        <button onClick={handleAddIngredient}>Přidej další ingredience</button>
      </div>
      <div className='addrecipe-item'>
        {preparationProcess.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`${index+1}`}
              value={value}
              onChange={(event) => handlePreparationProcessChange(index, event)}
            />
            <button onClick={() => handleRemovePreparationProcess(index)}>Odstraň pole</button>
          </div>
        ))}
        <button onClick={handleAddPreparationProcess}>Přidej další krok postupu</button>
      </div>
      <button onClick={editRecipe}
        disabled={Object.values(errors).some(error => error !== '')}
        style={{ cursor: Object.values(errors).some(error => error !== '') ? 'not-allowed' : 'pointer' }}
        >Upravit recept</button>
    </div>
  );
};

export default EditRecipe;
