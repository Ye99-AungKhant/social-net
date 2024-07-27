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
import Badge from '@mui/material/Badge';

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
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<chatlist[]>([])
    const messagesEndRef = useRef<null | HTMLElement>(null);
    const chatRef = useRef<null | HTMLInputElement>(null)
    const [selectUser, setSelectUser] = useState<any>()
    const { friendList } = useAppSelector((state) => state.app)
    const { chats } = useAppSelector((state) => state.chat)
    const { authUser } = useAppSelector((state) => state.auth)
    const [unreadMessage, setUnReadMessage] = useState<any>({})
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setOpen(false);
    };
    const handleSend = (seleteUserId: any) => {
        if (chatRef.current?.value) {
            let id = Date.now()
            // let sender_id = authUser ? authUser.id : 0
            let receiver_id = seleteUserId
            let msg = chatRef.current.value
            const newMessage: any = { id, receiver_id, message: msg };
            setMessage([...message, newMessage])
            dispatch(sendChatMessage(newMessage))
            chatRef.current.value = ''

            if (ws) {
                ws.send(JSON.stringify({
                    type: 'message',
                    message: msg,
                    senderId: authUser?.id,
                    receiverId: seleteUserId,
                }));
            }

        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    };

    const handleSelectUser = (user: any) => {

        if (unreadMessage[user.id] != 0) {
            console.log('unreadmessage count handle', unreadMessage[user.id])
            setUnReadMessage((prevCounts: any) => ({
                ...prevCounts,
                [user.id]: 0,
            }))

            if (ws) {
                ws.send(JSON.stringify({
                    type: 'setMessageCount',
                    userId: user.id,
                }));
            }
        }

        dispatch(chatfetch(user.id)).then((res) => res.payload).then((data: any) => setMessage(data))
        setSelectUser(user)
    }

    const handleChatWindowClose = () => {
        setSelectUser('')
    }
    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080');
        websocket.onopen = () => {
            websocket.send(JSON.stringify({ type: 'login', userId: authUser?.id }));
        };
        websocket.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            console.log('realtime data', parsedMessage);

            if (parsedMessage.type === 'message' && selectUser) {
                console.log('seletedUser', selectUser);

                if (parsedMessage.receiverId == selectUser.id || parsedMessage.senderId == selectUser.id) {
                    setMessage((prevMessages: any) => [
                        ...prevMessages,
                        {
                            id: Date.now(),
                            sender_id: parsedMessage.senderId,
                            receiver_id: authUser?.id,
                            message: parsedMessage.message,
                        },
                    ]);
                }
            } else if (parsedMessage.type === 'messageCount') {
                setUnReadMessage((prevCounts: any) => ({
                    ...prevCounts,
                    [parsedMessage.userId]: parsedMessage.count,
                }));
                console.log('unreadmessage count', parsedMessage.count);

            }
        };
        scrollToBottom();
        setWs(websocket);
        return () => websocket.close();

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
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                                sx={{ position: 'absolute', right: 0 }}
                            >
                                <CloseIcon />
                            </IconButton>
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
                                            <Badge badgeContent={unreadMessage[list.id]} color="error">
                                                <Avatar alt="Travis Howard" src={list.profile} />
                                            </Badge>
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
                                    {message && message.map((chat) => (
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
