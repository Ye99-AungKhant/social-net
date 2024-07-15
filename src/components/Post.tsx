import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import "./style/post.css"
import './style/PhotoGallery.css'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatIcon from '@mui/icons-material/Chat';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import CommentDialog from './CommentDialog';
import { postLike } from '../store/slices/postSlice';
import { fetchComment } from '../store/slices/commentSlice';
import MenuPopup from './MenuPopup';
import PostPhotoDialog from './PostPhotoDialog';

const Post = () => {
    const posts = useAppSelector((state) => state.posts)
    const dispatch = useAppDispatch()
    const [openCommetDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openPostPhotoDialog, setOpenPostPhotoDialog] = useState<boolean>(false)
    const [postCommentId, setPostCommentId] = useState<number>(0)
    const [postMenuId, setPostMenuId] = useState<number>(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [showMore, setShowMore] = useState<any>({})
    const { authUser } = useAppSelector((state) => state.auth)
    const maxPhotos = 4;

    function srcset(image: string, size: number, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const handleLike = (postId: number) => {
        console.log("post liked", postId);
        dispatch(postLike(postId))
    }
    const handleCommentDialog = (postId: number) => {
        setOpenCommentDialog(!openCommetDialog)
        setPostCommentId(postId)
        dispatch(fetchComment(postId))
    }

    const handlePostPhotoDialog = (postId: number) => {
        setOpenPostPhotoDialog(!openPostPhotoDialog)
    }

    const handlePostToggle = (postId: number) => {
        setShowMore((prevState: any) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }))
    };

    const handlePostMenu = (postId: number) => {
        setOpenMenu(!openMenu)
        setPostMenuId(postId)
    }

    return (
        <Box className='containerBox'>
            <Box className='storySection'>
                <Typography className='storyHeader'>Stories</Typography>
                <Box className='storyBox'>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2ZfH1x24-7Nagdv4N9kOX6bDzqJ_nFu2Tg&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2ZfH1x24-7Nagdv4N9kOX6bDzqJ_nFu2Tg&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2ZfH1x24-7Nagdv4N9kOX6bDzqJ_nFu2Tg&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    {/* <Box className='storyPaginate'><ArrowForwardIosRoundedIcon /></Box> */}
                </Box>
            </Box>
            <Box className='postSection'>
                <Box className='postFilter'>
                    <button className='filterBtn'>All</button>
                    <button className='filterBtn' disabled>Following</button>
                </Box>

                {posts.posts.map((post) => (
                    <Box className='postContainer' key={post.id}>
                        <Card sx={{ width: 500, marginBottom: 2 }}>

                            {post.image && post.image?.length > 0 &&
                                <div className="gallery">
                                    {post.image.slice(0, maxPhotos).map((photo, index) => (
                                        <div className="photo-container" key={index} onClick={() => handlePostPhotoDialog(post.id)}>
                                            <img src={photo.url} alt='postphoto' className="photo" />
                                            {post.image && index === maxPhotos - 1 && post.image.length > maxPhotos && (
                                                <div className="overlay">
                                                    +{post.image.length - maxPhotos}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                    }
                                    <PostPhotoDialog
                                        open={openPostPhotoDialog}
                                        setOpen={setOpenPostPhotoDialog}
                                        photo={post.image}
                                    />
                                </div>

                            }

                            <CardContent sx={{ margin: 0, padding: 0, minHeight: 100, width: '100%' }}>
                                <div className='postHeader'>
                                    <div className="postProfile">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="post" />
                                        <div className='profileText'>
                                            <p>{post.user.name}</p>
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
                    </Box>
                ))}
                <CommentDialog
                    open={openCommetDialog}
                    setOpen={setOpenCommentDialog}
                    postId={postCommentId}
                />

            </Box>
        </Box>
    )
}

export default Post