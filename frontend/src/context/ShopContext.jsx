import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props)=>{
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
        if(sessionStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getsaveforlater',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${sessionStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:"",
            }).then((response)=>response.json()).then((data)=>setSaveLater(data));
        }
    };    
    useEffect(()=>{
        fetchAllRecipes();
        fetchSaveForLater();
    },[])
    

    const saveForLater= (recipeId)=>{
        setSaveLater((prev)=>({...prev,[recipeId]:prev[recipeId]+1}));
        if(sessionStorage.getItem('auth-token')){
            fetch('http://localhost:4000/savelater',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${sessionStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"recipeId":recipeId}),
            }).then((response)=>response.json()).then((data)=>setSaveLater(data)).catch((error)=>console.error('error:', error))
        }
    }
    const removeFromSave= (recipeId)=>{
        setSaveLater((prev)=>({...prev,[recipeId]:prev[recipeId]-1}));
        if(sessionStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromsave',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${sessionStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"recipeId":recipeId}),
            }).then((response)=>response.json()).then((data)=>setSaveLater(data)).catch((error)=>console.error('error:', error))
        }
    }
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in saveLater){
            if(saveLater[item]>0){
                let itemInfo= all_recipes.find((recipe)=>recipe.id==Number(item))
                totalAmount+=itemInfo.new_price * saveLater[item];
            }
        }
    }
    const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const item in saveLater){
            if(saveLater[item] > 0){
                totalItem += saveLater[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_recipes, saveLater,saveForLater,removeFromSave};

    return(
        <div>
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
        </div>
    )
}
export default ShopContextProvider