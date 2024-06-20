import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
    <ul class="list-group">
    <NavLink to={"userDetails"} className="nav-link" ><li>Details</li></NavLink>
    <NavLink to={"orders"} className="nav-link"><li >Orders</li></NavLink>
    <NavLink to={"editProfile"} className="nav-link"><li >Edit Profile</li></NavLink>

  </ul>
  )
}

export default UserMenu