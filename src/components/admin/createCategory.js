import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
import CategoryForm from '../form/categoryForm';
import toast from 'react-hot-toast';
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState();
  const auth = useSelector(authSelector);
  const [visible,setVisible]=useState(false);
  const [selected,setSelected]=useState();
  const [updateName,setUpdateName]=useState();
  const getAll=()=>{
    fetch(`${process.env.REACT_APP_API}/api/category/getCategories`, {
      method: "GET",
      headers: {
        "Authorization": auth.token
      }
    }).then((res) => res.json()).then((x) => {setCategories(x.categories)}
  );
  }
  useEffect(() => {
      getAll()
  }, [])

  const editHandler=async(e)=>{
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/api/category/updateCategory/${selected._id}`,{
      method:"PUT",
      headers:{
        "Authorization":auth.token,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:updateName
      })  
    }).then((res)=>res.json()).then((x)=>{
      if(x.success){
        toast.success(`${updateName} is created`);
        getAll()
      }
      else{
        toast.error(x.message);
      }
      setUpdateName("");
      setSelected("");
      getAll();
      setVisible(false)
    }
    )
  }

  const addHandler=async(e)=>{
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/api/category/createCategory`,{
      method:"POST",
      headers:{
        "Authorization":auth.token,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name
      })  
    }).then((res)=>res.json()).then((x)=>{
      if(x.success){
        toast.success(`${name} is created`);
        getAll()
      }
      else{
        toast.error(x.message);
      }
      setName("")
    }
    )
  }
  const handleDelete=async(e)=>{
    const con=window.confirm(`You sure you want to delete "${e.name}"?`);
    if(!con){
      return
    }
    await fetch(`${process.env.REACT_APP_API}/api/category/deleteCategory/${e._id}`,{
      method:"DELETE",
      headers:{
        "Authorization":auth.token,
        "Content-Type":"application/json"
      }, 
    }).then((res)=>res.json()).then((x)=>{
      if(x.success){
        toast.success(`${e.name} is deleted`);
      }
      else{
        toast.error(x.message);
      }
      getAll();
    }
    )
  }
  return (<>

    <h1 className='text-center heading'>Manage Category</h1>
    <div style={{margin:"40px 0"}}>
    <CategoryForm  handler={addHandler} name={name} setName={setName} wantTo="Add"/>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((e) =>{
          return <tr key={e._id}>
            <td>{e.name}</td>
            <td>
              
            <button className='btn btn-primary' onClick={()=>{setVisible(true); setUpdateName(e.name); setSelected(e)}}>Edit</button>
              <button className='btn btn-primary' onClick={()=>handleDelete(e)}>Delete</button>
            </td>
          </tr>
        })}


      </tbody>
    </table>
    <Modal title="Basic Modal" open={visible} footer={false} onCancel={()=>setVisible(false)}>
        <CategoryForm  handler={editHandler} name={updateName} setName={setUpdateName} wantTo="Edit"/>
      </Modal>
  </>

  )
}

export default CreateCategory