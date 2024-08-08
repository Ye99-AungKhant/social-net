import Box from '@mui/material/Box';
import { Avatar, Badge, ListItemText, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}));
const RightSidebar = () => {
    const { friendList, onlineUser } = useAppSelector((state) => state.app)

    return (
        <Box sx={{ width: '25%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <Typography sx={{ textAlign: 'left', color: '#626262', fontWeight: 'bold', marginLeft: 2 }}>FRIENDS</Typography>
                    {friendList && friendList.map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton>
                                <Stack direction="row" spacing={2}>

                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant={onlineUser.includes(item.id) ? 'dot' : 'standard'}
                                    >
                                        <Avatar alt="Remy Sharp" src={item.profile} />
                                    </StyledBadge>
                                </Stack>
                                <ListItemText
                                    sx={{ marginLeft: 1 }}
                                    primary={item.name}
                                />
                                <Box>
                                    <Typography sx={{ fontSize: 11, color: '#9a9a9a' }}>10 min</Typography>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
        </Box >
    )
}

export default RightSidebar