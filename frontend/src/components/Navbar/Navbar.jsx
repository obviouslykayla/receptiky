import React, {useState} from 'react'
import './Navbar.css'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket, faArrowRightToBracket, faBookmark, faBowlFood, faBowlRice, faBreadSlice, faCakeCandles, faGlassWater, faList, faNewspaper, faPlateWheat, faPlus, faUserPen} from   "@fortawesome/free-solid-svg-icons";


const Navbar = () => {

    const [menu,setMenu]= useState("Recepty");

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" height={30}/>
            <p className='nav-name'>RECEPTÍKY</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("Recepty")}}><Link style={{textDecoration: 'none'}} to='/'><p className='big'>Novinky</p><FontAwesomeIcon icon={faNewspaper} className='icon' /></Link>{menu==="Recepty"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Sladké")}}><Link style={{textDecoration: 'none'}} to='/sladke'><p className='big'>Sladké</p><FontAwesomeIcon icon={faCakeCandles} className='icon' /></Link>{menu==="Sladké"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Předkrmy")}}><Link style={{textDecoration: 'none'}} to='/predkrmy'><p className='big'>Předkrmy</p><FontAwesomeIcon icon={faBreadSlice} className='icon' /></Link>{menu==="Předkrmy"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Nápoje")}}><Link style={{textDecoration: 'none'}} to='/napoje'><p className='big'>Nápoje</p><FontAwesomeIcon icon={faGlassWater} className='icon' /></Link>{menu==="Nápoje"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Polévky")}}><Link style={{textDecoration: 'none'}} to='/polevky'><p className='big'>Polévky</p><FontAwesomeIcon icon={faBowlRice} className='icon' /></Link>{menu==="Polévky"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Hlavní chody")}}><Link style={{textDecoration: 'none'}} to='/hlavni-chody'><p className='big'>Hlavní chody</p><FontAwesomeIcon icon={faBowlFood} className='icon' /></Link>{menu==="Hlavní chody"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Saláty")}}><Link style={{textDecoration: 'none'}} to='/salaty'><p className='big'>Saláty</p><FontAwesomeIcon icon={faPlateWheat} className='icon' /></Link>{menu==="Saláty"? <hr/>:<></>}</li>
        {localStorage.getItem('auth-token')?<li style={{textDecoration: 'none'}} onClick={()=>{localStorage.getItem('auth-token');window.location.replace('/addrecipe')}}><p className='big'>Přidat recept</p><FontAwesomeIcon icon={faPlus} className='icon' /></li>
        :<></>
        }
        {localStorage.getItem('auth-token')?<li style={{textDecoration: 'none'}} onClick={()=>{localStorage.getItem('auth-token');window.location.replace('/listrecipes')}}><p className='big'>Seznam receptů</p><FontAwesomeIcon icon={faList} className='icon' /></li>
        :<></>
        }
        {localStorage.getItem('auth-token')?<li style={{textDecoration: 'none'}} onClick={()=>{localStorage.getItem('auth-token');window.location.replace('/savelater')}}><p className='big'>Uloženo na později</p><FontAwesomeIcon icon={faBookmark} className='icon' /></li>
        :<></>
        }
        
        {localStorage.getItem('auth-token')?<li style={{textDecoration: 'none'}} onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}><p className='big'>Odhlásit se</p><FontAwesomeIcon icon={faArrowRightFromBracket} className='icon' /></li>
        :<li style={{textDecoration: 'none'}}><Link to='/login'><p className='big'>Přihlásit se</p><FontAwesomeIcon icon={faArrowRightToBracket} className='icon' /></Link></li>
        }
        {localStorage.getItem('auth-token')?<li style={{textDecoration: 'none'}} onClick={()=>{localStorage.getItem('auth-token');window.location.replace('/edituser')}}><p className='big'>Změna hesla</p><FontAwesomeIcon icon={faUserPen} className='icon' /></li>
        :<></>
        }
        
        </ul>
    </div>
  )
}

export default Navbar
