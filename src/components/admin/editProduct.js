import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import "./editProduct.css"
const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const auth = useSelector(authSelector)
  const nav=useNavigate();

  const handleDelete=(id,name)=>{
    const con=window.confirm(`You sure want to delete product "${name}"`)
    fetch(`${process.env.REACT_APP_API}/api/product/deleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": auth.token,
      },
    }).then((res) => res.json()).then((x) => { 
      if(x.success){
        setTimeout(()=>{
          toast.success(x.message)
        },500)
        nav("/dashboard/admin/editProduct")
      }
      else{
        console.log(x.message)
        toast.error(x.message)
      }
    }
    )
  }


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/product/getAllProducts`, {
      headers: {
        "Authorization": auth.token
      }
    }).then((res) => res.json()).then((x) => {
      if (x.success) {
        setProducts(x.products)
      }
      else {
        toast.error(x.message);
      }
    })
  },[])
  return (

    <>
      <div className='d-flex' style={{ width: "100%" ,flexFlow:'wrap',justifyContent:"flex-start",margin:"auto"}}>  
        {products.map((e) => (
          <div className='card cardLength' style={{ overflow:"hidden"}}>
              <div className='imageContainer'style={{width:"100%",overflow:"hidden", display:"flex", alignItems:"center"}}>
                <img src={`${process.env.REACT_APP_API}/api/product/getPhoto/${e._id}`} className="card-img-top" alt={e.name} style={{height:"auto",width:"100%"}}/>
                </div>
              <div className="card-body d-flex flex-column justify-content-between">
                <p className="card-title heading">{e.name}</p>
                <p className="card-text">₹ {e.price}</p>
                <div className='text-center'>
                <Link to={`/dashboard/ADMIN/updateProduct/${e.slug}`}className="btn btn-primary fullLength" >Edit</Link>
                <Link  className="btn btn-primary fullLength" onClick={()=>handleDelete(e._id,e.name)} >Delete</Link>
                </div>

              </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default EditProduct