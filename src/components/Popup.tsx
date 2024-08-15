import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Noti } from '../types/app';
import { Link, useNavigate } from 'react-router-dom';
import './style/notification.css'
import { markAsReadAllNoti, notiRead } from '../store/slices/appSlice';
import { useAppDispatch } from '../store/hooks';
import { Divider } from '@mui/material';

interface Props {
    open: boolean
    closeMenu: () => void
    notiData: Noti[]
}
const Popup = ({ open, closeMenu, notiData }: Props) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleLinkToPost = (postId: number, notiId: number) => {
        navigate(`/post/${postId}`)
        dispatch(notiRead(notiId))
    }
    const handleMarkAsReadAll = () => {
        if (notiData.length > 0) {
            let allNoti = notiData.map((noti) => noti.id)
            dispatch(markAsReadAllNoti(allNoti))
        }
    }

    return (
        <>
            {open && (
                <Box onClick={closeMenu} sx={{ bgcolor: '#FAFAFA', position: 'fixed', right: 0, zIndex: 3 }}>
                    <Box component='div' className='markAsRead' onClick={handleMarkAsReadAll}><Box>Mark as Read</Box></Box>
                    <Divider />
                    <List component="nav" aria-label="main mailbox folders" className='notiBox'>
                        {notiData.map((item) => (
                            <ListItemButton
                                key={item.id}
                                onClick={() => handleLinkToPost(item.post_id, item.id)}
                                className={`${item.read ? '' : 'unread'}`}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard" src={item.user.profile} />
                                </ListItemAvatar>
                                <ListItemText primary={item.user.name + ' ' + item.content} className={`${item.read ? '' : 'unread'}`} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            )}
        </>

    )
}

export default Popup