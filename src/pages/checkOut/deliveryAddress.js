import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
import "./deliveryAddress.css"
import styles from './checkout.module.css'
import { useNavigate } from 'react-router-dom';
const DeliveryAddress = () => {
  const [name,setName]=useState();
  const [phone,setPhone]=useState();
  const [address,setAddress]=useState();
  const [city,setCity]=useState();
  const [state,setState]=useState();
  const [pin,setPin]=useState();
  const auth=useSelector(authSelector).user;
  const nav=useNavigate();
  useEffect(()=>{
    const defaultAddress=JSON.parse(localStorage.getItem('defaultAddress'));
    if(defaultAddress){
      setName(defaultAddress.name);
      setPhone(defaultAddress.phone);
      setAddress(defaultAddress.address);
      setCity(defaultAddress.city);
      setState(defaultAddress.state)
      setPin(defaultAddress.pin)
    }
    else{
      setName(auth.name);
      setPhone(auth.phone);
    }

  },[auth])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    localStorage.setItem("defaultAddress",JSON.stringify({name,address,city,state,pin,phone}))
    
    setName("");
    setAddress("");
    setCity("");
    setPhone("");
    setState("")
    setPin("")
    nav(`/checkout?step=1`)
  }
  return (
    <div className='d-flex flex-column  align-items-center'>
      <h1 className='heading'>Delivery Address</h1>
      <div>
      <form onSubmit={handleSubmit}>
          <div className="mb-3 " >
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" onChange={(e)=>{
              setName(e.target.value);
            }} value={name} required/>
          </div>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">Address</label>
            <textarea className="form-control" id="address" onChange={(e)=>{
              setAddress(e.target.value);
            }} value={address}
             required/>
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" 
            onChange={(e)=>{
              setCity(e.target.value);
            }} value={city}
            required/>
          </div>
          
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input type="text" className="form-control" id="state" onChange={(e)=>{
              setState(e.target.value);
            }} value={state} required/>
          </div>

          <div className="mb-3">
            <label htmlFor="pin" className="form-label">Pin</label>
            <input type="text" className="form-control" id="pin" onChange={(e)=>{
              setPin(e.target.value);
            }} value={pin} required/>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">phone</label>
            <input type="tel" className="form-control" id="phone" pattern="[0-9]{10}" onChange={(e)=>{
              setPhone(e.target.value);
            }} value={phone} required/>
          </div>
          <button type="submit" className="btn btn-primary">Deliver here</button>
        </form>
      </div>
    </div>
  )
}

export default DeliveryAddress