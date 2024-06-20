import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
import { Outlet } from 'react-router-dom';
import Spinner from '../spinner';

const ProtectedDash = () => {
  const { token } = useSelector(authSelector);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // console.log("inside the useeffect")

    token &&     fetch(`${process.env.REACT_APP_API}/api/auth/dashboard`, {
      method: "GET",
      headers: {
        Authorization: token
      }
    }).then((res) => res.json())
      .then((x) => {
        setOk(x.success)
      })
  },[token])
  
  return (
    ok ? <Outlet /> : <Spinner page="/login"/>
  )
}

export default ProtectedDash