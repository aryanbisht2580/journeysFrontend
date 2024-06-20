import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
import { Select } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { Option } from 'antd/es/mentions';
const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState();
  const [quantity, setQuantity] = useState();
  const [image, setImage] = useState();
  const [brand,setBrand]=useState();
  const auth = useSelector(authSelector)
  const [id,setId] = useState('')
  const siz = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const nav=useNavigate();
  const params=useParams();
  const ischeck=(s)=>{
    if(sizes.indexOf(s)==-1)return false;
    else return true;
  }
  const handleSize = (s) => {
    const ind = sizes.indexOf(s);
    if (ind == -1) {
      setSizes([...sizes, s]);
    }
    else {
      setSizes(sizes.filter((e) => e != s));
    }
  }
  const getAllCat = () => {
    fetch(`${process.env.REACT_APP_API}/api/category/getCategories`, {
      method: "GET",
      headers: {
        "Authorization": auth.token
      }
    }).then((res) => res.json()).then((x) => { setCategories(x.categories) }
    );
  }
  const fillForm=()=>{
    fetch(`${process.env.REACT_APP_API}/api/product/getProduct/${params.slug}`, {
      method: "GET",
    }).then((res) => res.json()).then((x) => { 
      if(x.success){
        setId(x.product._id)
        setName(x.product.name);
        setCategory(x.product.category._id);
        setColor(x.product.color);
        setImage(x.product.image);
        setPrice(x.product.price);
        setSizes(x.product.sizes);
        setQuantity(x.product.quantity)
        setDescription(x.product.description)
        setBrand(x.product.brand);
        
        
      }
      else{
        toast.error(x.product.message);
      }
     }
    );
  }
  useEffect(() => {
    getAllCat()
    fillForm();
  }, [])


  const handleSubmit = async(e) => {
    console.log(sizes)
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('color', color);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('brand',brand);
    if (image) {
      formData.append('image', image);
    }
    
    fetch(`${process.env.REACT_APP_API}/api/product/updateProduct/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": auth.token,
      },
      body:formData
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

  return (
    <>
      <h1 className='text-center heading'>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <Select
          showSearch
          style={{
            width: "100%",
            height: "3rem"
          }}
          placeholder="Select Category"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            
          }
          onChange={(e)=>setCategory(e)} value={category}
          // options={categories.map((e) => { return { value: e._id, label: e.name } })}
          
        >
          {categories.map((e)=>(
            <Option key={e._id} value={e._id} >{e.name}</Option>
          ))}
        </Select>
        <div>
          <label htmlFor="upload" className='btn btn-primary' style={{ margin: "20px 0", width: "100%" }}>Change Image</label>
          <input style={{ display: 'none' }} type='file' id="upload" accept='image/*' onChange={(e) => setImage(e.target.files[0])}></input>
          <div className='text-center'>
            {image ? <img src={URL.createObjectURL(image)} style={{ width: "200px", height: "auto" }}></img> :
            <img src={`${process.env.REACT_APP_API}/api/product/getPhoto/${id}`} style={{ width: "200px", height: "auto" }}></img> }
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="Description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input type="text" className="form-control" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="Price" className="form-label">Price</label>
          <input type="number" className="form-control" id="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Sizes</label>
          <div>
            {siz.map((e) => {
              return <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id={`s${e}`} defaultValue={e} name="sizes" onChange={(e) => handleSize(e)} checked={ischeck(e)}/>
                <label className="form-check-label" htmlFor={`s${e}`} >{e}</label>
              </div>
            })}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color</label>
          <input type="text" className="form-control" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary mb-3">Update Product</button>


      </form>
    </>
  )
}

export default UpdateProduct