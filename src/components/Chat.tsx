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
import { Box, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import './style/chat.css'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { chatfetch, chatNotiRemove, chatSearch, getlastMessage, sendChatMessage } from '../store/slices/chatSlice';
import { Chat as chatlist, ChatMedia, ChatSlice } from '../types/chat';
import Badge from '@mui/material/Badge';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { imageDb } from '../config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { v4 as uuid } from 'uuid';
import { StyledBadge } from './RightSidebar';
import { useWebSocket } from './WebSocketProvider';
import { ChatSearchLoading } from './SkeletonComponent';
import { config } from './../config/index';

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
    newChatBadge: (data: any) => void
}
const Chat = ({ open, setOpen, newChatBadge }: Props) => {

    const { ws, wsMessage, wsMessageCount, wsOnlineUser, wsReadMessage } = useWebSocket() || {};
    const [message, setMessage] = useState<chatlist[]>([])
    const messagesEndRef = useRef<null | HTMLElement>(null);
    const chatRef = useRef<null | HTMLInputElement>(null)
    const [selectUser, setSelectUser] = useState<any>()
    const { friendList, chatUserList } = useAppSelector((state) => state.app)
    const { chats, lastMessage } = useAppSelector((state) => state.chat)
    const { authUser } = useAppSelector((state) => state.auth)
    const [unreadMessage, setUnReadMessage] = useState<any>({})
    const [selectedImages, setSelectedImages] = useState<any>([])
    const [selectedImagesUpload, setSelectedImagesUpload] = useState<any>([])
    const { chatNoti } = useAppSelector((state) => state.app)
    const [onlineUser, setOnlineUser] = useState<any>()
    const [sortedFriendList, setSortedFriendList] = useState<any[]>([]);
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const [typingTimeout, setTypingTimeout] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false);
    };
    const handleSend = async (seleteUserId: any) => {
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
                    read: false
                }));
            }
        } else if (selectedImagesUpload.length > 0) {
            const uploadPromises = await selectedImagesUpload.map(async (image: any) => {
                const imgRef = ref(imageDb, `chat/sn_${uuid()}`)
                const uploaded = await uploadBytes(imgRef, image)
                return getDownloadURL(uploaded.ref);
            })
            let downloadUrl: any = []
            downloadUrl = await (Promise.all(uploadPromises))
            downloadUrl = downloadUrl.map((url: string) => ({ url }));
            setSelectedImages([])
            setSelectedImagesUpload([])
            console.log(downloadUrl);
            let id = Date.now()
            let msg = chatRef.current?.value ? chatRef.current?.value : null
            let receiver_id = seleteUserId
            const newMessage: any = { id, receiver_id, message: msg, media: downloadUrl };
            setMessage([...message, newMessage])
            dispatch(sendChatMessage(newMessage))
            if (ws) {
                ws.send(JSON.stringify({
                    type: 'message',
                    message: msg,
                    media: downloadUrl,
                    senderId: authUser?.id,
                    receiverId: seleteUserId,
                    read: false
                }));
            }
        }
    };

    const handleSelectUser = (user: any) => {

        if (unreadMessage[user.id] != 0) {
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
            const senderId = user.id
            dispatch(chatNotiRemove(senderId))
        }

        dispatch(chatfetch(user.id)).then((res) => res.payload).then((data: any) => setMessage(data))
        setSelectUser(user)
    }

    const handleChatWindowClose = () => {
        setSelectUser('')
    }

    const onSelectFile = (event: any) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles).slice(0, 10);
        const imagesArray = selectedFilesArray.map((file: any) => {
            return URL.createObjectURL(file);
        });
        setSelectedImages((previousImages: any) => previousImages.concat(imagesArray));
        setSelectedImagesUpload(selectedFilesArray)
        event.target.value = "";
    };

    const deletePreviewImageHandler = (image: any) => {
        setSelectedImages(selectedImages.filter((e: any) => e !== image));
        URL.revokeObjectURL(image);
    }

    useEffect(() => {
        const unreadCounts: { [key: number]: number } = {};
        chatNoti?.forEach((noti) => {
            chatUserList?.forEach((friend) => {
                if (friend.id === noti.sender_id) {
                    if (!unreadCounts[noti.sender_id]) {
                        unreadCounts[noti.sender_id] = 0;
                    }
                    unreadCounts[noti.sender_id]++;
                }
            });
        });
        setUnReadMessage(unreadCounts);

    }, [chatNoti, chatUserList])

    const scrollToBottom = () => {
        if (messagesEndRef.current)
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    };
    useEffect(() => {
        scrollToBottom();
        dispatch(getlastMessage(''))
    }, [message])

    useEffect(() => {

        if (wsMessage) {
            if (wsMessage.type === 'message' && selectUser != null) {
                console.log('seletedUser', selectUser);
                if (wsMessage.receiverId == selectUser.id || wsMessage.senderId == selectUser.id) {
                    setMessage((prevMessages: any) => [
                        ...prevMessages,
                        {
                            id: Date.now(),
                            sender_id: wsMessage.senderId,
                            receiver_id: authUser?.id,
                            message: wsMessage.message,
                            media: wsMessage.media,
                            read: wsMessage.read
                        },
                    ]);
                    console.log('incoming message', wsMessage);
                }

            }
            if (wsMessage.type === 'message' && wsMessage.receiverId == authUser?.id) {
                newChatBadge({
                    id: Date.now(),
                    sender_id: wsMessage.senderId,
                    receiver_id: authUser?.id,
                    message: wsMessage.message,
                    media: wsMessage.media,
                    read: wsMessage.read
                })
            }


            if (wsReadMessage) {
                setMessage((prevMessages) => prevMessages.map((msg) =>
                    msg.sender_id === wsReadMessage.receiverId ? { ...msg, read: true } : msg
                ));
            }

        }
        if (wsMessageCount && !selectUser) {
            if (wsMessageCount.type === 'messageCount') {
                setUnReadMessage({
                    [wsMessageCount.userId]: wsMessageCount.count,
                });
            }
        }
        // markMessagesAsRead(authUser?.id);
    }, [wsMessage]);

    useEffect(() => {
        setOnlineUser(wsOnlineUser?.data)
    }, [wsOnlineUser])

    const markMessagesAsRead = async (senderId: any) => {
        // Send read status to the WebSocket server
        if (ws) {
            ws.send(JSON.stringify({
                type: 'read',
                senderId: senderId,
                receiverId: authUser?.id,
            }));
            // Send read status to the Laravel backend to update in the database
            await fetch(`${config.ApiBaseUrl}/chat/read`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    sender_id: senderId,
                    receiver_id: authUser?.id,
                }),
            });

            setMessage((prevMessages) => prevMessages.map((msg) =>
                msg.sender_id === senderId ? { ...msg, read: true } : msg
            ));
        }

    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const query = e.target.value;

        if (query) {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }

            setTypingTimeout(
                setTimeout(() => {
                    setLoading(true)
                    dispatch(chatSearch(query)).then((res) => res.payload).then((data) => {
                        if (data.length > 0) {
                            setSearchTerm("")
                            setLoading(false)
                            return setSortedFriendList([...data])
                        } else {
                            setSortedFriendList([])
                            setLoading(false)
                            return setSearchTerm("No Results")
                        }
                    }
                    )
                }, 1000)
            );
        } else {
            chatUserList && setSortedFriendList([...chatUserList])
            setSearchTerm("")
            setLoading(false)
        }
    };

    useEffect(() => {
        if (chatUserList) {
            const sortedList = [...chatUserList].sort((a, b) => {
                const lastMessageA = lastMessage.find(
                    (message) => message.sender_id === a.id || message.receiver_id === a.id
                );
                const lastMessageB = lastMessage.find(
                    (message) => message.sender_id === b.id || message.receiver_id === b.id
                );

                if (lastMessageA?.receiver_id === authUser?.id && lastMessageB?.receiver_id !== authUser?.id) {
                    return -1;
                } else if (lastMessageA?.receiver_id !== authUser?.id && lastMessageB?.receiver_id === authUser?.id) {
                    return 1;
                } else {
                    return 0;
                }
            });

            setSortedFriendList(sortedList);
        }

    }, [chatUserList, lastMessage, authUser]);



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
                            <input type="text" placeholder="Search..." className="search-input" onChange={handleSearch} />
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
                            {sortedFriendList?.map((list) => (
                                <Box key={list.id}>
                                    <ListItemButton onClick={() => handleSelectUser(list)}>
                                        <ListItemText
                                            sx={{ position: 'absolute', right: 0, top: 0, marginTop: 2, marginRight: 1, color: '#9a9a9a' }}
                                            secondary={onlineUser && onlineUser.includes(list.id) ? 'Online' : 'Offline'}
                                        />
                                        <ListItemAvatar>
                                            <Badge badgeContent={unreadMessage[list.id]} color="error">
                                                <Avatar alt={list.name} src={list.profile} />
                                                {onlineUser && onlineUser.includes(list.id) &&
                                                    (<StyledBadge
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        variant="dot"
                                                    ></StyledBadge>)
                                                }

                                            </Badge>
                                        </ListItemAvatar>
                                        <ListItemText primary={list.name} secondary={lastMessage.map((message) => message.sender_id == list.id || message.receiver_id == list.id ? message.message : '')} />
                                    </ListItemButton>
                                    <Divider />
                                </Box>
                            ))}
                            {loading && <ChatSearchLoading />}

                            {searchTerm && <Typography variant='subtitle2' align="center" mt={1}>No Results <br></br> Try a new search</Typography>}
                        </Box>
                    </Box>
                    {selectUser &&
                        (<Box sx={{ width: '80%', position: 'relative' }}>
                            <Box className='chat-window'>
                                <Box className='chatAppBar'>
                                    <ListItemButton>
                                        <ArrowBackRoundedIcon onClick={handleChatWindowClose} />
                                        <ListItemAvatar>
                                            <Avatar alt={selectUser.name} src={selectUser.profile} />
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
                                <Box className='messages' ref={messagesEndRef}>
                                    {message && message.map((chat) => (
                                        <Box key={chat.id} className={chat.receiver_id == authUser?.id ? 'messageReceiver' : 'messageSender'}>

                                            {chat.media &&
                                                <Box key={chat.id} className='chatImageBox'>
                                                    {chat.media.map((item) => (
                                                        <ImageListItem key={item.id} className='chatImage'>
                                                            <img
                                                                src={`${item.url}`}
                                                                alt='chat_photo'
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </Box>
                                            }
                                            {chat.message !== null &&
                                                <Box className={`${chat.receiver_id == authUser?.id ? 'receiver' : 'sender'} ${chat.read ? '' : ''}`}>
                                                    {chat.message}
                                                </Box>
                                            }
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box className="imagePreviewContainer">
                                {selectedImages &&
                                    selectedImages.map((image: any, index: any) => {
                                        return (
                                            <Box className='imagePreviewBox' key={index}>
                                                <IconButton sx={{ position: 'absolute', right: 0 }}
                                                    onClick={() => deletePreviewImageHandler(image)}
                                                >
                                                    <CloseRoundedIcon className='removePreviewImage' />
                                                </IconButton>
                                                <img src={image} height="200" alt="upload" className='imagePreview' />
                                            </Box>
                                        );
                                    })
                                }
                            </Box>
                            <Box className="chat-form">
                                <div className="input-container">
                                    {selectedImages && selectedImages.length < 10 &&
                                        <label className='file-input-container' htmlFor="formId" onChange={onSelectFile}>
                                            <CameraAltIcon className='choosePhotoEmoji' />
                                            <input
                                                type='file'
                                                id="formId"
                                                multiple accept="image/png , image/jpeg, image/webp"
                                                hidden
                                            />
                                        </label>
                                    }
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