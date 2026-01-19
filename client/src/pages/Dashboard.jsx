import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate,NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'

const Dashboard = () => {

    const navigate = useNavigate()

    const [showLogout, setShowLogout] = useState(false)

    const {companyData,setCompanyData,setCompanyToken}  = useContext(AppContext)
 
    // Function to logour the company
       const logout=() =>{
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
       }

       useEffect(()=>{
        if(companyData){
            navigate('/dashboard/manage-jobs')
        }
       },[companyData])

  return (
    <div className='min-h-screen'>
        
        {/* Navbar for recruiter Panel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img onClick={e => navigate("/")} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                    {companyData && (
                        <div className='flex items-center gap-3'>
                            <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
                            
                            {/* Removed Hover Logic and Added Click Logic */}
                            <div className='relative cursor-pointer' onClick={() => setShowLogout(!showLogout)}>
                                <img className='w-8 border rounded-full' src={companyData.image} alt="" />
                                
                                {showLogout && (
                                    <div className='absolute top-full right-0 z-10 text-black rounded pt-2'>
                                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm shadow-md'>
                                            {/* Styled Red Button */}
                                            <li 
                                                onClick={logout} 
                                                className='py-1 px-5 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 transition-all whitespace-nowrap'
                                            >
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        <div className='flex items-start'>

            {/* left Sidebar with option to add job,manage jobs,view application */}
            
            <div className='inline-block min-h-screen border-r-2'>
                <ul className='flex flex-col items-start pt-5'>
                    <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                    <img className='min-w-4' src={assets.add_icon} alt="" />
                    <p className='max-sm:hidden'>Add Job</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                    <img className='min-w-4' src={assets.home_icon} alt="" />
                    <p className='max-sm:hidden'>Manage Jobs</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                    <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                    <p className='max-sm:hidden'>View Applications</p>
                    </NavLink>

                </ul>
            </div>

            <div className='flex-1 h-full p-2 sm:p-5'>
                <Outlet />
            </div>
        </div>

    </div>
  )
}

export default Dashboard