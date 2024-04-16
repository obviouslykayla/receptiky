import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const RecipeContextProvider = (props)=>{
    const [all_recipes, setAll_Recipes] = useState([]);
    const getDefaultCart = ()=>{
        let cart ={};
        for (let index = 0; index < all_recipes.length+1; index++) {
            cart[index]=0;
        }
        return cart;
    }
    const [saveLater, setSaveLater]= useState(getDefaultCart()); 
    
    const fetchAllRecipes = () =>{
        fetch('http://localhost:4000/allrecipes')
        .then((response)=>response.json())
        .then((data)=>setAll_Recipes(data))
        .catch((error)=>console.error('error:', error))
    };
    const fetchSaveForLater = () =>{
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getsaveforlater',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`
                }
            })
            .then((response)=>response.json())
            .then((data)=>setSaveLater(data));
        }
    };    
    
    useEffect(()=>{
        fetchAllRecipes();
        fetchSaveForLater();
    },[])  
    
    const saveForLater= (recipeId)=>{
        setSaveLater((prev)=>({...prev,[recipeId]:prev[recipeId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/savelater',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"recipeId":recipeId}),
            }).then((response)=>response.json())
            .then((data)=>setSaveLater(data))
            .catch((error)=>console.error('error:', error))
        }
    }
    const removeFromSave= (recipeId)=>{
        setSaveLater((prev)=>({...prev,[recipeId]:prev[recipeId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromsave',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"recipeId":recipeId}),
            }).then((response)=>response.json())
            .then((data)=>setSaveLater(data))
            .catch((error)=>console.error('error:', error))
        }
    }
    const contextValue = {all_recipes, saveLater,saveForLater,removeFromSave};
    return(
        <div>
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
        </div>
    )
}
export default RecipeContextProvider