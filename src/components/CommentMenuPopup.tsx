import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';

interface Notification {
    id: number;
    name: string;
    type: string;
}

interface Props {
    open: boolean
    notiData: Notification[]
}
const CommentMenuPopup = () => {

    return (
        <>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FAFAFA', position: 'relative', zIndex: 2 }}>
                <h1>Edit comment</h1>
            </Box>
        </>

    )
}

export default CommentMenuPopup