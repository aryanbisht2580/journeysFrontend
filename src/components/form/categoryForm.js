import React from 'react'

const CategoryForm = ({handler,name,setName,wantTo}) => {
  return (
    <form onSubmit={handler}>
  <div className="mb-3" style={{display:'flex', alignItems:'center'}}>
    <input type="text" className="form-control" id="categoryForm" placeholder='Enter new Category...' style={{width:"85%", display:'inline-block'}}
     onChange={(e)=>setName(e.target.value)} value={name}></input>
    <button type="submit" className="btn btn-primary" >{wantTo}</button>
  </div>
</form>

  )
}

export default CategoryForm