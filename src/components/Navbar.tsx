import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import Popup from './Popup';
import Menu from './Menu';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PostCreate from './PostCreate';
import '../components/style/style.css'
import { Avatar } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import defaultUser from './user.png'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar() {

    const menuId = 'primary-search-account-menu';
    const noti = [
        { id: 1, name: 'Alice', type: 'reacted love on your post' },
        { id: 2, name: 'Banjamin', type: 'shared your post' },
        { id: 3, name: 'Justmin', type: 'reacted love on your photo' },
        { id: 4, name: 'Uncle Sum', type: 'reacted love on your photo' },
    ]

    const [open, setOpen] = useState<boolean>(false)
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [openPostCreate, setOpenPostCreate] = useState<boolean>(false)
    const { authUser } = useAppSelector((state) => state.auth)
    const handlePopup = () => {
        if (openMenu)
            setOpenMenu(false)
        if (open)
            return setOpen(false)
        return setOpen(true)
    }

    const handleOpenMenu = () => {
        if (open)
            setOpen(false)
        if (openMenu)
            return setOpenMenu(false)
        return setOpenMenu(true)
    }

    const handlePost = () => {
        if (!openPostCreate)
            return setOpenPostCreate(true)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        LOGO
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" color="inherit"
                            onClick={handlePost}
                        >
                            <AddCircleRoundedIcon />
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handlePopup}
                        >
                            <Badge badgeContent={noti.length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleOpenMenu}
                            color="inherit"
                        >
                            <Avatar alt="Remy Sharp" src={authUser?.profile ? authUser?.profile : 'defaultUser'} />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
            <Box sx={{ position: 'absolute', right: 10 }}>
                {open && <Popup
                    open={open}
                    notiData={noti}
                />}
            </Box>
            <Box sx={{ position: 'absolute', right: 10 }}>
                {openMenu && <Menu
                    open={openMenu}
                />}
            </Box>
            <PostCreate open={openPostCreate} setOpen={setOpenPostCreate} type='Post' />
        </Box>
    );
}
