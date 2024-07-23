import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { friendRequestAccept, friendRequestDecline, friendRequestFetch, waitingFriend, waitingFriendCancel } from '../store/slices/friendRequestSlice';

const FriendRequest = () => {
    const dispatch = useAppDispatch()
    const [friendRequestedList, setFriendRequestedList] = useState<any>()
    const [waitingFriendRequest, setWaitingFriendRequest] = useState<any>()
    useEffect(() => {
        dispatch(friendRequestFetch({})).then((res) => res.payload).then((data) => {
            setFriendRequestedList(data)
            console.log(data);
        })
        dispatch(waitingFriend({})).then((res) => res.payload).then((data) => {
            console.log(data);
            setWaitingFriendRequest(data)
        })
    }, [])

    const handleFriendRequestAccept = (id: number) => {
        dispatch(friendRequestAccept(id))
        setFriendRequestedList(friendRequestedList.filter((list: any) => (list.id != id)))
    }

    const handleFriendRequestDecline = (id: number) => {
        dispatch(friendRequestDecline(id))
        setFriendRequestedList(friendRequestedList.filter((list: any) => (list.id != id)))
    }

    const handleWaitingFriendCancel = (id: number) => {
        dispatch(waitingFriendCancel(id))
        setWaitingFriendRequest(waitingFriendRequest.filter((list: any) => (list.id != id)))
    }

    return (
        <Box sx={{ width: '50%', display: 'flex' }}>
            <List sx={{ width: '50%', bgcolor: 'background.paper' }}>
                <Typography sx={{ marginLeft: 1, fontSize: '15' }}>Friends Request</Typography>
                {friendRequestedList && friendRequestedList.map((reqlist: any) => (
                    <Box key={reqlist.id}>
                        <ListItem sx={{ paddingBottom: 0 }}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={reqlist.added_user.profile} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={reqlist.added_user.name}
                            />
                            <ListItemText
                                sx={{ position: 'absolute', right: 0, marginRight: 1, color: '#9a9a9a' }}
                                primary={reqlist.date}
                            />
                        </ListItem>
                        <ListItem sx={{ marginLeft: 5, paddingTop: 0 }}>
                            <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => handleFriendRequestAccept(reqlist.id)}>Accept</Button>
                            <Button variant="contained" size="small" sx={{ bgcolor: '#9a9a9a', color: 'black' }} onClick={() => handleFriendRequestDecline(reqlist.id)}>Delete</Button>
                        </ListItem>
                        <Divider />
                    </Box>
                ))}

            </List>
            <List sx={{ width: '50%', bgcolor: 'background.paper', marginLeft: 1 }}>
                <Typography sx={{ marginLeft: 1, fontSize: '15' }}>Waiting...</Typography>
                {waitingFriendRequest && waitingFriendRequest.map((reqlist: any) => (
                    <Box key={reqlist.id}>
                        <ListItem sx={{ paddingBottom: 0 }}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={reqlist.adding_user.profile} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={reqlist.adding_user.name}
                            />
                            <ListItemText
                                sx={{ position: 'absolute', right: 0, marginRight: 1, color: '#9a9a9a' }}
                                primary={reqlist.date}
                            />
                        </ListItem>
                        <ListItem sx={{ marginLeft: 5, paddingTop: 0 }}>
                            <Button variant="contained" size="small" sx={{ marginRight: 1 }} disabled>Waiting...</Button>
                            <Button variant="contained" size="small" onClick={() => handleWaitingFriendCancel(reqlist.id)}>Cancel</Button>
                        </ListItem>
                        <Divider />
                    </Box>
                ))}

            </List>
        </Box>


    );
}

export default FriendRequest