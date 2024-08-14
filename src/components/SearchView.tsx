import { Avatar, Box, Card, CardContent, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { UserDetail } from '../types/app'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { postLoading, profileLoading } from './SkeletonComponent'
import PostPhotoDialog from './PostPhotoDialog'
import MenuPopup from './MenuPopup'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom'
import { postLike } from '../store/slices/postSlice'
import { fetchComment } from '../store/slices/commentSlice'
import defaultUser from './user.png'
import "./style/post.css"
import CommentDialog from './CommentDialog'
import { useWebSocket } from './WebSocketProvider';

const SearchView = () => {
    const { searchUser, searchPost } = useAppSelector((state) => state.app)
    const [openCommetDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openPostPhotoDialog, setOpenPostPhotoDialog] = useState<any>({})
    const [postPhotoIndex, setPostPhotoIndex] = useState<number>(0)
    const [postCommentId, setPostCommentId] = useState<number>(0)
    const [postCommentOwnerId, setPostCommentOwnerId] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [postMenuId, setPostMenuId] = useState<number>(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [showMore, setShowMore] = useState<any>({})
    const { authUser } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const [filterSearch, setFilterSearch] = useState<string>('All')
    const { ws, wsMessage } = useWebSocket() || {};
    const maxPhotos = 4;

    const handleLike = (postId: number, postOwnerId: number) => {
        const filterPost = 'searchPost'
        let postData = { filterPost, postId }
        dispatch(postLike(postData))
        if (ws) {
            ws.send(JSON.stringify({
                type: 'newNoti',
                postOwnerId: postOwnerId
            }))
        }
    }
    const handleCommentDialog = (postId: number, postUserId: number) => {
        setOpenCommentDialog(!openCommetDialog)
        setPostCommentId(postId)
        setPostCommentOwnerId(postUserId)
        dispatch(fetchComment(postId))
    }

    const handlePostPhotoDialog = (postId: number, index: number) => {
        setPostPhotoIndex(index)
        setOpenPostPhotoDialog((prevState: any) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }))
    }

    const handleLoaded: React.ReactEventHandler<HTMLImageElement> = () => {
        setLoading(false)
    }

    const handlePostToggle = (postId: number) => {
        setShowMore((prevState: any) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }))
    };

    return (
        <Box sx={{ width: '50%', bgcolor: 'background.paper' }} className='containerBox'>
            <Box className='postFilter'>
                <button type='button' className={`filterBtn ${filterSearch == 'All' ? 'filterBtnActive' : ''}`} onClick={() => setFilterSearch('All')}>All</button>
                <button type='button' className={`filterBtn ${filterSearch == 'Posts' ? 'filterBtnActive' : ''}`} onClick={() => setFilterSearch('Posts')}>Posts</button>
                <button type='button' className={`filterBtn ${filterSearch == 'People' ? 'filterBtnActive' : ''}`} onClick={() => setFilterSearch('People')}>People</button>
            </Box>

            {(filterSearch == 'All' || filterSearch == 'People') &&
                (
                    <List>
                        {searchUser.map((user) => (
                            <Box key={user.id}>
                                <ListItemButton>
                                    <Stack direction="row" spacing={2}>

                                        <Avatar alt="Remy Sharp" src={user.profile} />
                                    </Stack>
                                    <ListItemText
                                        sx={{ marginLeft: 1 }}
                                        primary={user.name}
                                    />
                                </ListItemButton>
                                <Divider />
                            </Box>
                        ))}
                    </List>
                )
            }

            {(filterSearch == 'All' || filterSearch == 'Posts') &&
                (
                    <Box sx={{ marginBottom: '10px' }}>
                        {
                            searchPost.map((post) => (
                                <Box className='postContainer' key={post.id}>
                                    <Card sx={{ width: 500 }}>

                                        {post.image && post.image?.length > 0 &&
                                            <div className="gallery">
                                                {post.image.slice(0, maxPhotos).map((photo, index) => (
                                                    <div className={post.image?.length == 1 ? 'photo-container-one' : 'photo-container'
                                                        && post.image?.length == 2 ? 'photo-container-two' : 'photo-container'}
                                                        key={index} onClick={() => handlePostPhotoDialog(post.id, index)}>

                                                        {loading && postLoading}
                                                        <img
                                                            src={photo.url}
                                                            alt='postphoto'
                                                            className="photo"
                                                            onLoad={handleLoaded}
                                                        />

                                                        {post.image && index === maxPhotos - 1 && post.image.length > maxPhotos && (
                                                            <div className="overlay">
                                                                +{post.image.length - maxPhotos}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                                }
                                                {openPostPhotoDialog[post.id] && <PostPhotoDialog
                                                    open={true}
                                                    setOpen={setOpenPostPhotoDialog}
                                                    photo={post.image}
                                                    photoIndex={postPhotoIndex}
                                                />}
                                            </div>

                                        }

                                        <CardContent sx={{ margin: 0, padding: 0, minHeight: 100, width: '100%' }}>
                                            <div className='postHeader'>
                                                <div className="postProfile">

                                                    {loading && profileLoading}
                                                    <Link to={`profile/${post.user.id}`}>
                                                        <img
                                                            src={post.user.profile ? post.user.profile : defaultUser}
                                                            alt="profile"
                                                            onLoad={handleLoaded}
                                                        />
                                                    </Link>
                                                    <div className='profileText'>
                                                        <Link to={`profile/${post.user.id}`}><p>{post.user.name}</p></Link>
                                                        <p className='postDate'>{post.date}</p>
                                                        {postMenuId == post.id &&
                                                            < MenuPopup
                                                                editId={post.id}
                                                                deleteId={post.id}
                                                                open={openMenu}
                                                                setOpen={setOpenMenu}
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                                <div className='postAction'>
                                                    <div className='postLike'>

                                                        <FavoriteRoundedIcon onClick={() => handleLike(post.id, post.user.id)}
                                                            className={post.liked.find((like: any) => (like.user_id == authUser?.id)) ? 'active' : ''} />
                                                        <p className='postActionText'>{post.like_count}</p>
                                                    </div>
                                                    <div className='postComment' onClick={() => handleCommentDialog(post.id, post.user.id)}>
                                                        <ChatIcon />
                                                        <p className='postActionText'>{post.comment_count}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='postContent'>
                                                <Typography variant="body2" color="text.black">
                                                    {showMore[post.id] ? post.content : `${post.content.substring(0, 120)}`}
                                                    {post.content.length > 120 ?
                                                        <button className='showMoreBtn' onClick={() => handlePostToggle(post.id)}>
                                                            {showMore[post.id] ? "  See less" : "... See more"}
                                                        </button> : ''
                                                    }
                                                </Typography>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))
                        }
                    </Box>
                )
            }
            <CommentDialog
                open={openCommetDialog}
                setOpen={setOpenCommentDialog}
                postId={postCommentId}
                postOwnerId={postCommentOwnerId}
            />
        </Box>
    )
}

export default SearchView