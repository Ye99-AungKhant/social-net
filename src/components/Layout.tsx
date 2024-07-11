import Navbar from './Navbar'
import LeftSidebar from './LeftSidebar'
import { Box } from '@mui/material'
import RightSidebar from './RightSidebar'
import Post from './Post'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { fetchData } from '../store/slices/appSlice'

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
                <Post />
                <RightSidebar />
            </Box>
        </Box>
    )
}

export default Layout