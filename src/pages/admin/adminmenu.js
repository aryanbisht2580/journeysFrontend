import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <ul class="list-group">
      <NavLink to={"adminDetails"} className="nav-link" ><li>Details</li></NavLink>
      <NavLink to={"createCategory"} className="nav-link"><li >Create Category</li></NavLink>
      <NavLink to={"createProduct"} className="nav-link"><li>Create Product</li></NavLink>
      <NavLink to={"editProduct"} className="nav-link"><li >Edit Product</li></NavLink>
      <NavLink to={"orders"} className="nav-link"><li >Orders</li></NavLink>

    </ul>
  )
}

export default AdminMenu