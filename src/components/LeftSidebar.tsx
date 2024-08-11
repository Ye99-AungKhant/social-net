import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import CropOriginalRoundedIcon from '@mui/icons-material/CropOriginalRounded';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import { Typography, Badge } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { useState } from 'react';
import './style/style.css'

const sidebarMenu = [
    { id: 1, label: 'Feed', icon: <SpaceDashboardRoundedIcon />, route: '/', Iconcolor: '#2196f3' },
    { id: 2, label: 'Friends', icon: <PeopleAltRoundedIcon />, route: 'friend', Iconcolor: '#2e7d32' },
    { id: 4, label: 'Photos', icon: <CropOriginalRoundedIcon />, route: '', Iconcolor: '#ef6c00' },
    { id: 3, label: 'Watch Videos', icon: <SlideshowRoundedIcon />, route: '', Iconcolor: '#9016cd' },
]
const LeftSidebar = () => {
    const { friendRequestNoti } = useAppSelector((state) => state.app)
    const [active, setActive] = useState<number>();
    const navigate = useNavigate()

    const handleLinkTo = (route: string, id: number) => {
        navigate(route)
        setActive(id)
    }

    return (
        <Box sx={{ width: '20%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {sidebarMenu.map((item) => (
                        <ListItem key={item.id} disablePadding onClick={() => handleLinkTo(item.route, item.id)}>
                            <ListItemButton className={active == item.id ? 'activeTab' : ''}>
                                <ListItemIcon sx={{ color: item.Iconcolor }}>
                                    {item.id == 2 ? <Badge badgeContent={friendRequestNoti} color="error">
                                        {item.icon}
                                    </Badge>
                                        : <>{item.icon}</>
                                    }

                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Divider />

                </List>
            </nav>
        </Box>
    )
}

export default LeftSidebar