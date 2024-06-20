import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
import { Outlet } from 'react-router-dom';
import Spinner from '../spinner';
import toast from 'react-hot-toast';

const ProtectedAdminDash = () => {
  const { token } = useSelector(authSelector);
  const [ok, setOk] = useState(false);
  const user=useSelector(authSelector).user;
  useEffect(() => {
    // console.log("inside the useeffect")

    token &&     fetch(`${process.env.REACT_APP_API}/api/auth/adminDashboard`, {
      method: "POST",
      headers: {
        Authorization: token
      },
      body:JSON.stringify({
        user
      })
    }).then((res) => res.json())
      .then((x) => {
            
        setOk(x.success)
      })
  },[token])
  
  return (
    ok ? <Outlet /> : <Spinner page="/"/>
  )
}

export default ProtectedAdminDash