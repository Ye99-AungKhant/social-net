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
import { Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const sidebarMenu = [
    { id: 1, label: 'Feed', icon: <SpaceDashboardRoundedIcon />, route: '/', Iconcolor: '#2196f3' },
    { id: 2, label: 'Friends', icon: <PeopleAltRoundedIcon />, route: '', Iconcolor: '#2e7d32' },
    { id: 4, label: 'Photos', icon: <CropOriginalRoundedIcon />, route: '', Iconcolor: '#ef6c00' },
    { id: 3, label: 'Watch Videos', icon: <SlideshowRoundedIcon />, route: '', Iconcolor: '#9016cd' },
]
const LeftSidebar = () => {
    return (
        <Box sx={{ width: '20%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {sidebarMenu.map((item) => (
                        <Link key={item.id} to={item.route}>
                            <ListItem key={item.id} disablePadding>
                                <ListItemButton className='iconBg'>
                                    <ListItemIcon sx={{ color: item.Iconcolor }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                    <Divider />

                </List>
            </nav>
        </Box>
    )
}

export default LeftSidebar