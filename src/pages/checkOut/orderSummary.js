import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { cartSelector } from '../../redux/slices/cartSlice';
import { authSelector } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';
import "./orderSummary.css"
const OrderSummary = () => {
  // const cart = useSelector(cartSelector);
  const [cart,setCart] = useState([]);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const defaultAddress=JSON.parse(localStorage.getItem('defaultAddress'))
  const [amt, setAmt] = useState(0);
  const total = () => {
    let sum = 0;
    cart.map((e) => sum += (e.product.price * e.quantity));
    return sum;
  }
  useEffect(() => {
    console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);
    setAmt(total());
  }, [cart]);
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API}/api/cart`,{
      headers:{
          "Authorization":auth.token
      }
  }).then((res)=>res.json()).then((x)=>{console.log(x);setCart(x.cart)});
  },[])
  const handlePay=()=>{
    fetch(`${process.env.REACT_APP_API}/api/payment/`,{
      method:"POST",
      headers:{
        "Authorization":auth.token,
        "Content-Type":"Application/json"
      },
      body:JSON.stringify({
        cart,user:auth.user,address:defaultAddress,totalPrice:amt
      })
    }).then((res)=>res.json()).then((x)=>{
      if(x.success){
        handlePaymentVerify(x.order,x.neworderId)
        fetch(`${process.env.REACT_APP_API}/api/cart/deleteAll`,{
          headers:{
              "Authorization":auth.token
          }}
        )
        
      }
      else{
        
        toast.error("something went wrong")
      }
    });
    

  }
  const handlePaymentVerify = async (data,neworderId) => {
    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Journeys",
        description: "Test Mode",
        order_id: data.id,
        
        handler: async (response) => {
            console.log("response", response)
            try {
                const res = await fetch(`${process.env.REACT_APP_API}/api/payment/verify/${neworderId}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        "Authorization":auth.token
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    })
                })

                const verifyData = await res.json();

                if (verifyData.message) {
                    toast.success(verifyData.message)
                    

                }
            } catch (error) {
                console.log(error);
            }
            nav('/dashboard/user/orders');
        },
        theme: {
            color: "#5f63b8"
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}
  return (

    <div className='mt-4 row'>

      {cart.length > 0 && <div className='row p-0 m-0' style={{ height: "100%" }}>
        <div className='col-md-6 fullLength' >
          {cart.map((c) => (
            <div className='row  card m-3 p-2 d-flex flex-row align-itms-center justify-content-between' style={{ height: "20vh" ,overflow:'hidden'}}>
              <div className='col-4' style={{ height: "100%", overflow: 'hidden' }}>
                <img src={`${process.env.REACT_APP_API}/api/product/getPhoto/${c.product._id}`} className='rounded hwchange'></img>
              </div>
              <div className='col-8  d-flex flex-column justify-content-between' style={{ height: "100%" }}>
                <div  style={{ transform: "scale(0.9,0.6)", transformOrigin: "top left" }} >

                  <h3 className='heading changeFont'>{c.product.name}</h3>
                  <h5 style={{fontSize:"1rem"}}>size: {c.size}</h5>
                  <h4 className='heading changeFont' style={{ fontWeight: "300",fontSize:"1rem" }}>Color : {c.product.color}</h4>
                  <div className='d-flex flex-row align-items-center changeFont'>
                    Quantity :
                    <span className='price'>{c.quantity}</span>
                  </div>
                  <h4 className='price changeFont'>₹   {c.product.price} X {c.quantity} = ₹ {c.product.price * c.quantity}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='col-md-5 d-flex fullLength flex-column ms-3 row align-items-between'>
          <div>
            <h2 className='bg-dark text-light rounded text-center p-3'>Cart Total</h2>

            <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>Subtotal:</p>
              <p className='fw-normal price   '>₹ {amt}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>Shipping charges:</p>
              <p className='fw-normal price   '>₹ {amt > 7000 ? 0 : 200}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>Total:</p>
              <p className='fw-normal price   '>₹ {amt > 7000 ? amt : amt + 200}</p>
            </div>
          </div>
          <div>
          <h2 className='bg-dark text-light rounded text-center mt-4 p-3'>Address</h2>
          <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>Name:</p>
              <p className='fw-normal price   '>{defaultAddress.name}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>Address:</p>
              <p className='fw-normal price   '>{defaultAddress.address}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>City:</p>
              <p className='fw-normal price   '>{defaultAddress.city}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>State:</p>
              <p className='fw-normal price   '>{defaultAddress.state}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>Pin Code:</p>
              <p className='fw-normal price   '>{defaultAddress.pin}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <p className='fw-bold '>Phone:</p>
              <p className='fw-normal price   '>+91-{defaultAddress.phone}</p>
            </div>
            <div className='d-flex flex-row justify-content-center mt-4'>
              <button className='btn btn-primary' onClick={handlePay}>Pay</button>
            </div>
          </div>


        </div>
      </div>}


    </div>
  )
}

export default OrderSummary