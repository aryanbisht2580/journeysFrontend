import React, { useEffect, useState } from "react";
import styles from "./editUser.module.css"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActons, authSelector } from "../../redux/slices/authSlice";
const EditUser = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  
  const auth=useSelector(authSelector);
  const dispatch=useDispatch();
  const handleSubmit=(e)=>{
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API}/api/auth/updateUserProfile`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":auth.token
      },
      body:JSON.stringify({
        name,email,phone
      })
    }).then((res)=>res.json()).then((x)=>{
        
      if(x.success){
        console.log(x);
        
        dispatch(authActons.update(x.user));
        let ls=JSON.parse(localStorage.getItem('auth'));
        ls.user=x.user;
        localStorage.setItem('auth',JSON.stringify(ls));

        setTimeout(()=>{
          toast.success(x.message)
        },100)
        
      }
      else{
        toast.error(x.message)
        
      }
    });
    setName("");
    setEmail("");
    setPhone("")

  }
  useEffect(()=>{
    console.log("auth:  "+ JSON.stringify(auth.user));
    setName(auth.user.name)
    setEmail(auth.user.email);
    setPhone(auth.user.phone);
  },[auth])
  return (
      <div className={styles.center}>
        <h1 className="heading text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 " >
            <label htmlFor="username" className="form-label">UserName</label>
            <input type="text" className="form-control" id="username" onChange={(e)=>{
              setName(e.target.value);
            }} value={name} required/>
          </div>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={(e)=>{
              setEmail(e.target.value);
            }} value={email}
             required/>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">phone</label>
            <input type="tel" className="form-control" id="phone" pattern="[0-9]{10}" onChange={(e)=>{
              setPhone(e.target.value);
            }} value={phone} required/>
          </div>
          <button type="submit" className="btn btn-primary">Edit</button>
        </form>


      </div>
  );
};

export default EditUser;
