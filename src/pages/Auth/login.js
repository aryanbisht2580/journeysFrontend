import React, { useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import styles from "./register.module.css"
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { authActons, authSelector } from "../../redux/slices/authSlice";
const Login = () => {
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const nav=useNavigate();
  const location=useLocation();
  const dispatch=useDispatch();
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    fetch(`${process.env.REACT_APP_API}/api/auth/login`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"  
      },
      body:JSON.stringify({
        password,email
      })
    }).then((res)=>res.json()).then((x)=>{
      if(x.success){
        dispatch(authActons.set(x))
        localStorage.setItem("auth",JSON.stringify(x));
        setTimeout(()=>{
          toast.success(x.message)
        },100)
        nav(location.state || "/")
      }
      else{
        toast.error(x.message)
        
      }
    });
    setPassword("");
    setEmail("");

  }
  return (
    <MainLayout>
      <div className={styles.center}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={(e)=>{
              setEmail(e.target.value);
            }} value={email}
             required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" 
            onChange={(e)=>{
              setPassword(e.target.value);
            }} value={password}
            required/>
          </div>
          <button type="submit" className="btn btn-primary me-3">Submit</button>
          <NavLink to="/forgetPassEmail"><button className="btn">Forgot Password</button></NavLink>
          
        </form>


      </div>
    </MainLayout>
  );
};

export default Login;
