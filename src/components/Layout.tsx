import Navbar from './Navbar'
import LeftSidebar from './LeftSidebar'
import { Box } from '@mui/material'
import RightSidebar from './RightSidebar'
import Post from './Post'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchData } from '../store/slices/appSlice'
import { postFetch } from '../store/slices/postSlice'
import FriendRequest from './FriendRequest'

type ContextType = { ws: WebSocket | null, setWs: React.Dispatch<React.SetStateAction<WebSocket | null>> };

const Layout = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token')
    const { authUser } = useAppSelector((state) => state.auth)
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        if (!token) {
            return navigate('sign-in')
        }
        dispatch(fetchData({}))
    }, [])

    if (!token) {
        return null;
    }

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

export function useWs() {
    return useOutletContext<ContextType>();
}