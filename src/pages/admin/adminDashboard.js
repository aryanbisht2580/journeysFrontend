import React from 'react'
import MainLayout from '../../components/layouts/MainLayout'
import AdminMenu from './adminmenu'
import AdminDetails from '../../components/admin/adminDetails'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <MainLayout title="Admin Dashboard">
        
        <div className='container-fluid '>
          
          <div className='row'>
            <div className='col-md-3'>
              <h3 className='heading text-center'>Admin Dashboard</h3>
              <AdminMenu/>
            </div>
            <div className='col-md-9' >
              <Outlet/>
            </div>
          </div>
          
        </div>
       
    </MainLayout>
    
  )
}

export default AdminDashboard