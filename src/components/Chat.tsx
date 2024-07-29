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
import { chatfetch, chatNotiRemove, sendChatMessage } from '../store/slices/chatSlice';
import { Chat as chatlist, ChatMedia, ChatSlice } from '../types/chat';
import Badge from '@mui/material/Badge';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { imageDb } from '../config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { v4 as uuid } from 'uuid';

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
    const [selectedImages, setSelectedImages] = useState<any>([])
    const [selectedImagesUpload, setSelectedImagesUpload] = useState<any>([])
    const { chatNoti } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

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
        chatNoti?.map((noti) => friendList?.map((friend) => {

            let notiList: any = friend.id == noti.sender_id
            let i = 1
            if (notiList)
                i++
            setUnReadMessage((prevCounts: any) => ({
                ...prevCounts,
                [noti.sender_id]: i
            }));
            console.log('unreadMessage list', notiList);
        }))
    }, [chatNoti])


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
                            media: parsedMessage.media
                        },
                    ]);
                }
            } else if (parsedMessage.type === 'messageCount') {
                setUnReadMessage((prevCounts: any) => ({
                    ...prevCounts,
                    [parsedMessage.userId]: parsedMessage.count,
                }));
                console.log('unreadmessage count', parsedMessage.count);

            } else if (parsedMessage.type === 'read') {
                setMessage((prevMessages) => prevMessages.map((msg) =>
                    msg.sender_id === parsedMessage.receiverId ? { ...msg, read: true } : msg
                ));
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
                                                <Box className={chat.receiver_id == authUser?.id ? 'receiver' : 'sender'}>
                                                    {chat.message}
                                                </Box>
                                            }
                                        </Box>
                                    ))}
                                    <Box ref={messagesEndRef} />
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
