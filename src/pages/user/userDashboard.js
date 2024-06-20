import React from 'react'
import MainLayout from '../../components/layouts/MainLayout'
import { Outlet } from 'react-router-dom'
import UserMenu from './userMenu'
const UserDashboard = () => {
  return (
    <MainLayout title="User Dashboard">
        
        <div className='container-fluid '>
          
          <div className='row'>
            <div className='col-md-3'>
              <h1 className='text-center heading'>User Dashboard</h1>
              <UserMenu/>
            </div>
            <div className='col-md-9 mt-4'>
              <Outlet/>
            </div>
          </div>
          
        </div>
       
    </MainLayout>
  )
}

export default UserDashboard