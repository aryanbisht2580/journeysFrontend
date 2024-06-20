import React from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';

const UserDetails = () => {
    const data=useSelector(authSelector);
  return (
    <>
    <h1 className='heading text-center'>User Details</h1>
    <h3>Name: {data.user.name}</h3>
    <h3>Email: {data.user.email}</h3>
    <h3>Phone: +91-{data.user.phone}</h3>
    </>
  )
}

export default UserDetails