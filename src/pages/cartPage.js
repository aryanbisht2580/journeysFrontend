import React, { useEffect, useState } from 'react'
import MainLayout from '../components/layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { cartAction, cartSelector } from '../redux/slices/cartSlice'
import { authSelector } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { cartLengthAction } from '../redux/slices/cartLength'
import "./cartPage.css"
const CartPage = () => {
    // const cart = useSelector(cartSelector);
    const [cart,setCart]=useState([]);
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [amt, setAmt] = useState(0);
    const total = () => {
        let sum = 0;
        cart.map((e) => sum += (e.product.price * e.quantity));
        return sum;
    }
    useEffect(() => {
        setAmt(total());
    }, [cart]);
    const setTheCart=async()=>{
        fetch(`${process.env.REACT_APP_API}/api/cart`,{
            headers:{
                "Authorization":auth.token
            }
        }).then((res)=>res.json()).then((x)=>{setCart(x.cart)});
    }
    useEffect(()=>{
        setTheCart();
    },[])
    const handleDec = (cartId,newQuantity) => {
        // let prod = cart.find((c) => c._id == id && c.selectedSize == selectedSize);
        // console.log(prod.count + " " + prod.quantity)
        // if (prod.count == 1) return;


        // const pc = prod.count;
        // dispatch(cartAction.setCount({ ...prod, count: pc - 1 }));
        if(newQuantity<=0)return;
        fetch(`${process.env.REACT_APP_API}/api/cart/updateQuantity`,{
            method:"POST",
            headers:{
                "Authorization":auth.token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                cartId,newQuantity
            })


        }).then((res)=>res.json()).then((x)=>{setTheCart()});
    }
    const handleInc = (cartId,newQuantity,maxQuantity) => {
        // let prod = cart.find((c) => c._id == id && c.selectedSize == selectedSize);


        // if (prod.count == prod.quantity) return;
        // const pc = prod.count;
        // dispatch(cartAction.setCount({ ...prod, count: pc + 1 }));
        if(newQuantity>maxQuantity)return;
        fetch(`${process.env.REACT_APP_API}/api/cart/updateQuantity`,{
            method:"POST",
            headers:{
                "Authorization":auth.token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                cartId,newQuantity
            })


        }).then((res)=>res.json()).then((x)=>{setTheCart()});
    }
    const handleRemove=(cartId)=>{
        fetch(`${process.env.REACT_APP_API}/api/cart/remove`,{
            method:"POST",
            headers:{
                "Authorization":auth.token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                cartId
            })


        }).then((res)=>res.json()).then((x)=>{
            fetch(`${process.env.REACT_APP_API}/api/cart/getNumber`,{
                method:"POST",
                headers:{
                  "Authorization":auth.token,
                  "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                  userId:auth.user._id
                })
              }).then((res)=>res.json()).then((x)=>dispatch(cartLengthAction.set(x.count)));
              setTheCart()});
    }
    return (
        <MainLayout>
            <div className='mt-4'>

                {cart.length > 0 && <div className='row p-0 m-0' style={{ height: "100%" }}>
                    <div className='col-md-7 fullCard '>
                        {cart.map((c) => (
                            <div className='row card m-3 p-2 d-flex flex-row innercard'>
                                <div className='col-4 d-flex flex-row align-items-center' style={{overflow:"hidden"}}>
                                    <img src={`${process.env.REACT_APP_API}/api/product/getPhoto/${c.product._id}`} style={{ height: "auto", width: "100%" }}></img>
                                </div>
                                <div className='col-8 d-flex flex-column justify-content-between ' style={{ height: "auto" }}>
                                    <h3 className='heading'>{c.product.name}</h3>
                                    <h5>size: {c.size}</h5>
                                    <h4 className='heading' style={{ fontWeight: "300" }}>Color : {c.product.color}</h4>
                                    <div className='d-flex flex-row align-items-center'>
                                        Quantity:
                                        <button className='btn' onClick={() => handleDec(c._id,c.quantity-1)}>-</button>
                                        <span className='price'>{c.quantity}</span>
                                        <button className='btn' onClick={() => handleInc(c._id,c.quantity+1,c.product.quantity)}>+</button>
                                    </div>
                                    <h4 className='price'>₹ {c.product.price * c.quantity}</h4>
                                    <div className='btn btn-primary' onClick={() => handleRemove(c._id)}>remove
                                    </div>
                                </div>
                                {/* <div className='col-md-2 d-flex flex-column justify-content-end bg-dark'>
                                    
                                </div> */}
                            </div>
                        ))}
                    </div>
                    <div className='col-md-5 d-flex flex-column ps-3 row align-items-between fullTotal'>
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
                        {auth.token ?
                            <div className='btn btn-primary' style={{ width: '42%' }} onClick={() => nav("/checkout?step=0")}>CheackOut</div>
                            :
                            <div className='btn btn-primary' style={{ width: '42%' }} onClick={() => nav("/login", { state: "/cart" })}>Login to chekout</div>}

                    </div>
                </div>}
                {cart.length <= 0 && <h1 className='text-center heading'>Cart is Empty</h1>}
            </div>
        </MainLayout>
    )
}

export default CartPage