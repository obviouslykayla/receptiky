import React, { useState } from 'react'
import './CSS/LoginSignUp.css'

const LoginSignUp = () => {

  const [state,setState] = useState("Login");
  const [formData, setFormData]= useState({
    username:"",
    password:"",
    email:"",
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const login = async()=>{
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }
  else{
    alert(responseData.errors)
  }
  }

  const signup = async()=>{
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }
  else{
    alert(responseData.errors)
  }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' onChange={changeHandler} value={formData.username} type="text" placeholder='Uživatelské jméno' />:<></>}
          <input name='email' onChange={changeHandler} value={formData.email} type="email" placeholder='Email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Heslo' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Pokračovat</button>
        {state==="Sign Up"?<p className="loginsignup-login">Již máte účet? <span onClick={()=>{setState("Login")}}>Přihlašte se zde</span></p>
        :<p className="loginsignup-login">Nemáte účet? <span onClick={()=>{setState("Sign Up")}}>Vytvořte si ho zde</span></p>}
      </div>
    </div>
  )
}

export default LoginSignUp
