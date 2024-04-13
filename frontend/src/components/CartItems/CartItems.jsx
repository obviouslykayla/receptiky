import React from 'react'
import './CartItems.css'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assets/logo.jpg'
import Recipe from '../Recipes/Recipe'

const CartItems = () => {
    const {all_recipes, saveLater, removeFromSave}= useContext(ShopContext);

  return (
    <div className="cart">
    <div className='cartitems'>
      {all_recipes.map((e)=>{
        if(saveLater[e.id]>0){
            return (
                <>
            <Recipe id={e.id} name={e.name} image={e.image}/>
            <img src={remove_icon} width="25px"className='cartitems-remove-icon' onClick={()=>{removeFromSave(e.id)}}  alt="" />
            </>
        )

        }
        return null;
        })}
    </div>
    </div>
  )
}

export default CartItems
