import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { Divider } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NightlightRoundRoundedIcon from '@mui/icons-material/NightlightRoundRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import { Link, useNavigate } from 'react-router-dom';
import SignInUp from './SignInUp';
import { useAppDispatch } from '../store/hooks';
import { logOut } from '../store/slices/userSlice';

interface Props {
    open: boolean
    Id: number | undefined
}

const Menu = ({ open, Id }: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const handleLogOut = async () => {
        dispatch(logOut({
            onSuccess: () => {
                navigate("sign-in")
            }
        }))
    }
    const handleLinkToProfile = () => {
        navigate(`/profile/${Id}`)
    }

    return (
        <>
            {open && <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FAFAFA', position: 'relative', zIndex: 2 }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton onClick={handleLinkToProfile}>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Setting & Privacy' />
                    </ListItemButton>

                    {/* <ListItemButton>
                        <ListItemIcon>
                            <NightlightRoundRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Display' />
                    </ListItemButton> */}
                    <Divider />
                    <ListItemButton onClick={handleLogOut}>
                        <ListItemIcon>
                            <PowerSettingsNewRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Log Out' />
                    </ListItemButton>
                </List>
            </Box>}
        </>
    )
}

export default Menu