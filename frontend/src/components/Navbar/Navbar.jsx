import React, {useState} from 'react'
import './Navbar.css'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
import cart_icon from '../assets/bookmark.png'

const Navbar = () => {

    const [menu,setMenu]= useState("Recepty");

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" height={30}/>
            <p>RECEPTÍKY</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("Recepty")}}><Link style={{textDecoration: 'none'}} to='/'>Novinky</Link>{menu==="Recepty"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Sladké")}}><Link style={{textDecoration: 'none'}} to='/sladke'>Sladké</Link>{menu==="Sladké"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Předkrmy")}}><Link style={{textDecoration: 'none'}} to='/predkrmy'>Předkrmy</Link>{menu==="Předkrmy"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Nápoje")}}><Link style={{textDecoration: 'none'}} to='/napoje'>Nápoje</Link>{menu==="Nápoje"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Polévky")}}><Link style={{textDecoration: 'none'}} to='/polevky'>Polévky</Link>{menu==="Polévky"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Hlavní chody")}}><Link style={{textDecoration: 'none'}} to='/hlavni-chody'>Hlavní chody</Link>{menu==="Hlavní chody"? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Saláty")}}><Link style={{textDecoration: 'none'}} to='/salaty'>Saláty</Link>{menu==="Saláty"? <hr/>:<></>}</li>
        </ul>
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');
        window.location.replace('/addrecipe')}}>Přidat recept</button>
        :<></>
        }
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');
        window.location.replace('/listrecipe')}}>Seznam receptů</button>
        :<></>
        }
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');
        window.location.replace('/')}}>Logout</button>
        :<Link to='/login'><button>Login</button></Link>
        }
        <Link to='/savelater'><img src={cart_icon} alt="" width={50} height={30}/></Link>
    </div>
  )
}

export default Navbar
