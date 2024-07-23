import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './style/chat.css'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Chat({ open, setOpen }: Props) {
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{ position: 'absolute', right: 0 }}
                >
                    <CloseIcon />
                </IconButton>
                <List sx={{ width: '20%' }}>
                    <Box className="search-container">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <button className="search-button">
                            <SearchIcon className="search-icon" />
                        </button>
                    </Box>
                    <Box className="chat-user-list">
                        <ListItemButton>
                            <ListItemText
                                sx={{ position: 'absolute', right: 0, top: 0, marginTop: 2, marginRight: 1, color: '#9a9a9a' }}
                                secondary='2m'
                            />
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />

                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Bytewave" secondary="Good morning..." />
                        </ListItemButton>
                        <Divider />
                    </Box>
                </List>
            </Dialog>
        </React.Fragment>
    );
}
