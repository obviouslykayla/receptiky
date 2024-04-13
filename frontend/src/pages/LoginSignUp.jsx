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
    sessionStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }
  else{
    alert(responseData.errors)
  }
  }

  const signup = async()=>{
    console.log("signup exec", formData)
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
    sessionStorage.setItem('auth-token',responseData.token);
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
          {state==="Sign Up"?<input name='username' onChange={changeHandler} value={formData.username} type="text" placeholder='your name' />:<></>}
          <input name='email' onChange={changeHandler} value={formData.email} type="email" placeholder='your email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='passwod' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">already have an account? <span onClick={()=>{setState("Login")}}>login here</span></p>
        :<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>by continuing, i agree to the terms of use and policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignUp
