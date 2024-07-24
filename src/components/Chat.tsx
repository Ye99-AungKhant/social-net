import { forwardRef, Fragment, useEffect, useRef, useState } from 'react';
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
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import './style/chat.css'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { chatfetch, sendChatMessage } from '../store/slices/chatSlice';
import { Chat as chatlist, ChatSlice } from '../types/chat';

const Transition = forwardRef(function Transition(
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
const Chat = ({ open, setOpen }: Props) => {
    const [message, setMessage] = useState<chatlist[]>([])
    const messagesEndRef = useRef<null | HTMLElement>(null);
    const chatRef = useRef<null | HTMLInputElement>(null)
    const [selectUser, setSelectUser] = useState<any>()
    const { friendList } = useAppSelector((state) => state.app)
    const { chats } = useAppSelector((state) => state.chat)
    const { authUser } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setOpen(false);
    };
    const handleSend = (seleteUserId: any) => {
        if (chatRef.current?.value) {
            let id = message && message.length + 1
            let sender_id = authUser ? authUser.id : 0
            let receiver_id = seleteUserId
            let msg = chatRef.current.value
            const newMessage: chatlist = { id, sender_id, receiver_id, message: msg };
            setMessage([...message, newMessage])
            dispatch(sendChatMessage(newMessage))
            chatRef.current.value = ''
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    };

    const handleSelectUser = (user: any) => {

        dispatch(chatfetch(user.id)).then((res) => res.payload).then((data: any) => setMessage(data))
        setSelectUser(user)
    }

    const handleChatWindowClose = () => {
        setSelectUser('')
    }
    useEffect(() => {
        scrollToBottom();
    }, [message]);

    return (
        <Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <Box sx={{ display: 'flex', height: '100%' }}>
                    <Box sx={{ width: '30%' }}>
                        <Box className="search-container">
                            <input type="text" placeholder="Search..." className="search-input" />
                            <button className="search-button">
                                <SearchIcon className="search-icon" />
                            </button>
                        </Box>
                        <Box className="chat-user-list">
                            {friendList?.map((list) => (
                                <Box key={list.id}>
                                    <ListItemButton onClick={() => handleSelectUser(list)}>
                                        <ListItemText
                                            sx={{ position: 'absolute', right: 0, top: 0, marginTop: 2, marginRight: 1, color: '#9a9a9a' }}
                                            secondary='2m'
                                        />
                                        <ListItemAvatar>
                                            <Avatar alt="Travis Howard" src={list.profile} />
                                        </ListItemAvatar>
                                        <ListItemText primary={list.name} secondary="Good morning..." />
                                    </ListItemButton>
                                    <Divider />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    {selectUser &&
                        (<Box sx={{ width: '80%', position: 'relative' }}>
                            <Box className='chat-window'>
                                <Box className='chatAppBar'>
                                    <ListItemButton>
                                        <ArrowBackRoundedIcon onClick={handleChatWindowClose} />
                                        <ListItemAvatar>
                                            <Avatar alt="Travis Howard" src={selectUser.profile} />
                                        </ListItemAvatar>
                                        <ListItemText primary={selectUser.name} />
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={handleClose}
                                            aria-label="close"
                                            sx={{ position: 'absolute', right: 0 }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </ListItemButton>
                                </Box>
                                <Box className='messages'>
                                    {message && message.reverse().map((chat) => (
                                        <Box key={chat.id} className={chat.receiver_id == authUser?.id ? 'messageReceiver' : 'messageSender'}>
                                            <Box className={chat.receiver_id == authUser?.id ? 'receiver' : 'sender'}>
                                                {chat.message}
                                            </Box>
                                        </Box>
                                    ))}
                                    <Box ref={messagesEndRef} />
                                </Box>
                            </Box>

                            <Box className="chat-form">
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="Write message..."
                                        ref={chatRef}
                                    />
                                    <button type="submit" className="send-button" onClick={() => handleSend(selectUser.id)}>
                                        <SendIcon />
                                    </button>
                                </div>
                            </Box>
                        </Box>)
                    }
                </Box>
            </Dialog>
        </Fragment >
    );
}

export default Chat
