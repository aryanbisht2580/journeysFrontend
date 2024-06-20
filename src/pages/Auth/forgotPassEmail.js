import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import styles from "./register.module.css"
import toast from "react-hot-toast";
import { json, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import { useDispatch } from "react-redux";
import { authActons } from "../../redux/slices/authSlice";
const ForgetPassEmail = () => {
  const [email,setEmail]=useState();
  const [show,setShow]=useState(false);
  const [page,setPage]=useState();
  const nav=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(authActons.clearCode())
  },[])
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(JSON.stringify(email));
    
    setPage("/forgotPassCode");
    setShow(true)
    fetch(`${process.env.REACT_APP_API}/api/auth/getForgetPassword`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        email
      })
    }).then((res)=>res.json()).then((x)=>{
      
      if(x.success){
        setTimeout(()=>{
          console.log(x.code);
          toast.success(x.message)
        },500)
        dispatch(authActons.setCode(x))
        
        
      }
      else{
        setShow(false)
        setTimeout(()=>{
          toast.error(x.message)
        },500)
        // setPage("/forgotPassEmail");
      }
    });
    setEmail("");
  }
  return (
    <MainLayout>
      {show?<Spinner page={page}/>:      <div className={styles.center}>
        <h1>Forgot Password</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">Enter Email Address</label>
            <input type="email" className="form-control" id="email" onChange={(e)=>setEmail(e.target.value)} value={email}
             required/>
          </div>
          
          <button type="submit" className="btn btn-primary">Send OTP</button>
        </form>
        
      </div>}

    </MainLayout>
  );
};

export default ForgetPassEmail;
