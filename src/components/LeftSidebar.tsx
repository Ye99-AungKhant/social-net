import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

const sidebarMenu = [
    { id: 1, label: 'Feed', icon: <FeedOutlinedIcon />, route: '' },
    { id: 2, label: 'Photos', icon: <PhotoOutlinedIcon />, route: '' },
    { id: 3, label: 'Watch Videos', icon: <PlayCircleOutlinedIcon />, route: '' },
    { id: 4, label: 'Musics', icon: <FeedOutlinedIcon />, route: '' },
    { id: 5, label: 'Popular', icon: <FeedOutlinedIcon />, route: '' },
]
const LeftSidebar = () => {
    return (
        <Box sx={{ width: '20%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {sidebarMenu.map((item) => (
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
        </Box>
    )
}

export default LeftSidebar