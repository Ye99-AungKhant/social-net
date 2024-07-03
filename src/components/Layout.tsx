import Navbar from './Navbar'
import LeftSidebar from './LeftSidebar'
import { Box } from '@mui/material'
import RightSidebar from './RightSidebar'
import Post from './Post'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Layout = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('sign-in')
        }
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