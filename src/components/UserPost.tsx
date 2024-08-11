import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostPhotoDialog from './PostPhotoDialog'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { postLoading, profileLoading } from './SkeletonComponent'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatIcon from '@mui/icons-material/Chat';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { postLike, userPostFetch } from '../store/slices/postSlice'
import { Post } from '../types/app'
import defaultUser from './user.png'
import MenuPopup from './MenuPopup'
import { fetchComment } from '../store/slices/commentSlice'
import CommentDialog from './CommentDialog'

const UserPost = () => {
    const maxPhotos = 4;
    const { userpostId }: any = useParams();
    const { authUser } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const [post, setPost] = useState<Post>()
    const [openCommetDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openPostPhotoDialog, setOpenPostPhotoDialog] = useState<any>({})
    const [postCommentId, setPostCommentId] = useState<number>(0)
    const [postMenuId, setPostMenuId] = useState<number>(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [showMore, setShowMore] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userPostFetch(userpostId)).then((res) => res.payload).then((data) =>
            setPost(data)
        )
    }, [userpostId])

    const handlePostPhotoDialog = (postId: number) => {
        setOpenPostPhotoDialog((prevState: any) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }))
    }

    const handleLoaded: React.ReactEventHandler<HTMLImageElement> = () => {
        setLoading(false)
    }

    const handlePostMenu = (postId: number) => {
        setOpenMenu(!openMenu)
        setPostMenuId(postId)
    }

    const handleLike = (postId: number) => {
        let filterPost = ''
        let postData = { filterPost, postId }
        dispatch(postLike(postData))
    }
    const handleCommentDialog = (postId: number) => {
        setOpenCommentDialog(!openCommetDialog)
        setPostCommentId(postId)
        dispatch(fetchComment(postId))
    }

    const handlePostToggle = (postId: number) => {
        setShowMore((prevState: any) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }))
    };

    return (
        <Box className='postSection'>
            {post &&
                (<Box className='postContainer' key={post.id}>
                    <Card sx={{ width: 500 }}>

                        {post.image && post.image?.length > 0 &&
                            <div className="gallery">
                                {post.image.slice(0, maxPhotos).map((photo, index) => (
                                    <div className={post.image?.length == 1 ? 'photo-container-one' : 'photo-container'
                                        && post.image?.length == 2 ? 'photo-container-two' : 'photo-container'}
                                        key={index} onClick={() => handlePostPhotoDialog(post.id)}>

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
                                    <p style={{ marginLeft: '5px' }} className='menuBtn' onClick={() => handlePostMenu(post.id)}>▼</p>
                                </div>
                                <div className='postAction'>
                                    <div className='postLike'>

                                        <FavoriteRoundedIcon onClick={() => handleLike(post.id)}
                                            className={post.liked.find((like: any) => (like.user_id == authUser?.id)) ? 'active' : ''} />
                                        <p className='postActionText'>{post.like_count}</p>
                                    </div>
                                    <div className='postComment' onClick={() => handleCommentDialog(post.id)}>
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
                </Box>)
            }

            <CommentDialog
                open={openCommetDialog}
                setOpen={setOpenCommentDialog}
                postId={postCommentId}
                postOwnerId={0}
            />

        </Box>
    )
}

export default UserPost