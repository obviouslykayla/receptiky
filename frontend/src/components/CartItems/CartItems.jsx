import React from 'react'
import './CartItems.css'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assets/delete.png'
import Recipe from '../Recipes/Recipe'

const CartItems = () => {
    const {all_recipes, saveLater, removeFromSave}= useContext(ShopContext);
  return (
    <div className="cart">
    <div className='cartitems'>
      {all_recipes.map((e)=>{
        if(saveLater[e.id]>0){
            return (
                <div className='item'>
                  <Recipe id={e.id} image={e.image}name={e.name} />
                  <img src={remove_icon} className='cartitems-remove-icon' onClick={()=>{removeFromSave(e.id)}}  alt="" />
            </div>
        )
        }
        return null;
        })}
    </div>
    </div>
  )
}

export default CartItems
