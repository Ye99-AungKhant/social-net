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

interface Props {
    open: boolean
}

const Menu = ({ open }: Props) => {
    return (
        <>
            {open && <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton>
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

                    <ListItemButton>
                        <ListItemIcon>
                            <NightlightRoundRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Display' />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
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