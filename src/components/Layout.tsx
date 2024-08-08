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

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080')

        websocket.onopen = () => {
            websocket.send(JSON.stringify({ type: 'login', userId: authUser?.id }));
            console.log('WebSocket connection established');
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setWs(websocket);
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [authUser])

    return (
        <Box>
            <Navbar ws={ws} setWs={setWs} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 500 }}>
                <LeftSidebar />
                <Outlet context={{ ws, setWs } satisfies ContextType} />
                <RightSidebar />
            </Box>
        </Box>
    )
}

export default Layout

export function useWs() {
    return useOutletContext<ContextType>();
}