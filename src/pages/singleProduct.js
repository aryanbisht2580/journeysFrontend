import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { cartAction, cartSelector } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import { authSelector } from '../redux/slices/authSlice';
import { cartLengthAction } from '../redux/slices/cartLength';

const SingleProduct = () => {
    const [product, setProduct] = useState();
    const { slug } = useParams();
    // const cart=useSelector(cartSelector);
    const auth = useSelector(authSelector)
    const [cart, setCart] = useState([]);
    const [sizeSelect, setSizeSelect] = useState();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const setTheProd = async () => {
        fetch(`${process.env.REACT_APP_API}/api/product/getProduct/${slug}`).then((res) => res.json()).then((x) => { setProduct(x.product) });
    }
    const setTheCart = async () => {
        fetch(`${process.env.REACT_APP_API}/api/cart`, {
            headers: {
                "Authorization": auth.token
            }
        }).then((res) => res.json()).then((x) => { console.log(x); setCart(x.cart) });
    }
    useEffect(() => {
        setTheCart();
        setTheProd();


    }, [])
    const handleBut = (product) => {
    // console.log(product);
    if(!auth.user){
        setTimeout(()=>{
            toast("Please Login to Add to Cart !!!")
        },500)
        return nav("/Login")
    }
        let prod = cart.find((e) => product._id == e.product._id && e.size == sizeSelect);
        if (prod) {
            fetch(`${process.env.REACT_APP_API}/api/cart/remove`, {
                method: "POST",
                headers: {
                    "Authorization": auth.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product: prod.product._id, size: sizeSelect
                })
            }).then((res) => res.json()).then((x) => {
                fetch(`${process.env.REACT_APP_API}/api/cart/getNumber`, {
                    method: "POST",
                    headers: {
                        "Authorization": auth.token,
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        userId: auth.user._id
                    })
                }).then((res) => res.json()).then((x) => dispatch(cartLengthAction.set(x.count)))
                setTheCart();
            });
        }
        else {
            if (!sizeSelect) {
                toast.error("Select Size!!!")
            }
            else {
                fetch(`${process.env.REACT_APP_API}/api/cart/add`, {
                    method: "POST",
                    headers: {
                        "Authorization": auth.token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        product: product._id, quantity: 1, size: sizeSelect
                    })
                }).then((res) => res.json()).then((x) => {
                    fetch(`${process.env.REACT_APP_API}/api/cart/getNumber`, {
                        method: "POST",
                        headers: {
                            "Authorization": auth.token,
                            "Content-Type": "Application/json"
                        },
                        body: JSON.stringify({
                            userId: auth.user._id
                        })
                    }).then((res) => res.json()).then((x) => dispatch(cartLengthAction.set(x.count)))
                    setTheCart();
                });
            }

        }
    }
    const check = (id) => {
        console.log(cart)
        let prod = cart.find((e) => id == e.product._id && e.size == sizeSelect);
        return prod ? true : false
    }
    return (
        <MainLayout>
            <div className='btn btn-primary' onClick={() => nav(-1)}>
                back
            </div>
            {product && <div className='row m-4'>
                <div className='col-md-6 text-center' >
                    <img src={`${process.env.REACT_APP_API}/api/product/getPhoto/${product._id}`} style={{ width: "75%", height: 'auto' }}></img>
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-around mt-4' style={{ fontWeight: 'bolder', fontFamily: "unset" }}>
                    <div>
                        <h2 className='heading'>{product.name}</h2>
                        <h5 className='mt-4' style={{ fontWeight: 'lighter', fontSize: '0.9rem' }}>{product.description} </h5>
                        <h3 className='mt-4 price'>₹ {product.price}</h3>
                        <h5 >Size: <div className='d-flex flex-row'>
                            {product.sizes.map((s) => {
                                return <div className={`m-2 text-center ${sizeSelect == s ? 'colorGrey' : ''}`} style={{ height: "1.7rem", width: "2rem", borderRadius: "3px", border: "1px solid black", cursor: "pointer" }} onClick={() => { sizeSelect == s ? setSizeSelect() : setSizeSelect(s) }}>{s}</div>

                            })}
                        </div></h5>
                        <h5 >Color: {product.color}</h5>
                        <h6>Category: {product.category.name}</h6>
                    </div>
                    <div className='btn btn-primary' onClick={() => handleBut(product)}>{check(product._id) ? "Remove from cart" : "Add to cart"}</div>
                </div>
            </div>}
        </MainLayout>
    )
}

export default SingleProduct    