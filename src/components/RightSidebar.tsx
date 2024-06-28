import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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

const Friends = [
    { id: 1, label: 'Feed', icon: <FeedOutlinedIcon />, route: '' },
    { id: 2, label: 'Photos', icon: <PhotoOutlinedIcon />, route: '' },
    { id: 3, label: 'Watch Videos', icon: <PlayCircleOutlinedIcon />, route: '' },
    { id: 4, label: 'Musics', icon: <FeedOutlinedIcon />, route: '' },
    { id: 5, label: 'Popular', icon: <FeedOutlinedIcon />, route: '' },
]
const RightSidebar = () => {
    return (
        <Box sx={{ width: '20%', bgcolor: 'background.paper' }}>
            <Box>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        {/* <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            <nav aria-label="main mailbox folders">
                <List>
                    {Friends.map((item) => (
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

export default RightSidebar