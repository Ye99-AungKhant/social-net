import Navbar from './Navbar'
import LeftSidebar from './LeftSidebar'
import { Box } from '@mui/material'
import RightSidebar from './RightSidebar'
import Post from './Post'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { fetchData } from '../store/slices/appSlice'
import { postFetch } from '../store/slices/postSlice'
import FriendRequest from './FriendRequest'


const Layout = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            return navigate('sign-in')
        }
        dispatch(fetchData({}))

    }, [])

    return (
        <Box>
            <Navbar />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 500 }}>
                <LeftSidebar />
                <Outlet />
                <RightSidebar />
            </Box>
        </Box>
    )
}

export default Layout