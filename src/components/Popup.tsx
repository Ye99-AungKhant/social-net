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
import { Backdrop } from '@mui/material';

interface Props {
    open: boolean
    closeMenu: () => void
    notiData: Noti[]
}
const Popup = ({ open, closeMenu, notiData }: Props) => {

    const navigate = useNavigate()
    const handleLinkToPost = (postId: number) => {
        navigate(`/post/${postId}`)
    }

    return (
        <>
            {open && (
                <Box onClick={closeMenu} sx={{ bgcolor: '#FAFAFA', position: 'fixed', right: 0, zIndex: 3 }}>
                    <List component="nav" aria-label="main mailbox folders">
                        {notiData.map((item) => (
                            <ListItemButton
                                key={item.id}
                                onClick={() => handleLinkToPost(item.post_id)}
                                className={`${item.read ? '' : 'unread'}`}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard" src={item.user.profile} />
                                </ListItemAvatar>
                                <ListItemText primary={item.user.name + ' ' + item.content} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            )}
        </>

    )
}

export default Popup