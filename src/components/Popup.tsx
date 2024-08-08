import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Noti } from '../types/app';
import { Link } from 'react-router-dom';

interface Props {
    open: boolean
    notiData: Noti[]
}
const Popup = ({ open, notiData }: Props) => {

    return (
        <>
            {open && <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FAFAFA', position: 'relative', zIndex: 2 }}>
                <List component="nav" aria-label="main mailbox folders">
                    {notiData.map((item) => (
                        <ListItemButton
                            key={item.id}
                        >
                            <Link to={`/post/${item.post_id}`}>
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard" src={item.user.profile} />
                                </ListItemAvatar>
                                <ListItemText primary={item.user.name + ' ' + item.content} />
                            </Link>
                        </ListItemButton>
                    ))}
                </List>
            </Box>}
        </>

    )
}

export default Popup