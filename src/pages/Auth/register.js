import React, { useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import styles from "./register.module.css"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const nav=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API}/api/auth/register`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name,password,email,phone
      })
    }).then((res)=>res.json()).then((x)=>{
      if(x.success){

        setTimeout(()=>{
          toast.success(x.message)
        },100)
        nav("/login")
      }
      else{
        toast.error(x.message)
        
      }
    });
    setName("");
    setPassword("");
    setEmail("");
    setPhone("")

  }
  return (
    <MainLayout>
      <div className={styles.center}>
        <h1>Register</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" 
            onChange={(e)=>{
              setPassword(e.target.value);
            }} value={password}
            required/>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">phone</label>
            <input type="tel" className="form-control" id="phone" pattern="[0-9]{10}" onChange={(e)=>{
              setPhone(e.target.value);
            }} value={phone} required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>


      </div>
    </MainLayout>
  );
};

export default Register;
