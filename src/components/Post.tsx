import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import "./style/post.css"
import './style/PhotoGallery.css'
import defaultUser from './user.png'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatIcon from '@mui/icons-material/Chat';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import CommentDialog from './CommentDialog';
import { postLike } from '../store/slices/postSlice';
import { fetchComment } from '../store/slices/commentSlice';
import MenuPopup from './MenuPopup';
import PostPhotoDialog from './PostPhotoDialog';
import { postFetch } from '../store/slices/postSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { userSlice } from './../store/slices/userSlice';

const Post = () => {
    const posts = useAppSelector((state) => state.posts)
    const dispatch = useAppDispatch()
    const [openCommetDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openPostPhotoDialog, setOpenPostPhotoDialog] = useState<any>({})
    const [postCommentId, setPostCommentId] = useState<number>(0)
    const [postMenuId, setPostMenuId] = useState<number>(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [showMore, setShowMore] = useState<any>({})
    const { authUser } = useAppSelector((state) => state.auth)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const maxPhotos = 4;

    const handleLike = (postId: number) => {
        dispatch(postLike(postId))
    }
    const handleCommentDialog = (postId: number) => {
        setOpenCommentDialog(!openCommetDialog)
        setPostCommentId(postId)
        dispatch(fetchComment(postId))
    }

    const handlePostPhotoDialog = (postId: number) => {
        setOpenPostPhotoDialog((prevState: any) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }))
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        console.log('post loaded');

        try {
            dispatch(postFetch(page)).then((res) => res.payload).then((data) => {
                if (data.length == 0) {
                    setHasMore(false);
                }
            })
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Box id='containerBoxDiv' className='containerBox'>

            <Box className='storySection'>
                <Box className='storyBox'>
                    <div className='story'>
                        <div className='backdrop'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2ZfH1x24-7Nagdv4N9kOX6bDzqJ_nFu2Tg&s" alt="story" className='storyData' />
                        </div>
                        <AddCircleRoundedIcon className='uploadStory' sx={{ fontSize: 40 }} />
                        <p>Post Story</p>
                    </div>
                    <div className='story'>
                        <p className='storyName'>Khant</p>
                        <div className='backdrop'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2ZfH1x24-7Nagdv4N9kOX6bDzqJ_nFu2Tg&s" alt="story" className='storyData' />
                        </div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                        <p className='storyName'>Khant</p>
                    </div>

                </Box>
            </Box>

            <Box className='postSection'>
                <Box className='postFilter'>
                    <button className='filterBtn'>All</button>
                    <button className='filterBtn' disabled>Following</button>
                </Box>

                <InfiniteScroll
                    dataLength={posts.posts.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                    scrollableTarget="containerBoxDiv"
                >
                    {posts.posts.map((post) => (
                        <Box className='postContainer' key={post.id}>
                            <Card sx={{ width: 500, marginBottom: 2 }}>

                                {post.image && post.image?.length > 0 &&
                                    <div className="gallery">
                                        {post.image.slice(0, maxPhotos).map((photo, index) => (
                                            <div className={post.image?.length == 1 ? 'photo-container-one' : 'photo-container'
                                                && post.image?.length == 2 ? 'photo-container-two' : 'photo-container'}
                                                key={index} onClick={() => handlePostPhotoDialog(post.id)}>
                                                <img src={photo.url} alt='postphoto' className="photo" />
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

                                            <img src={post.user.profile ? post.user.profile.url : defaultUser} alt="profile" />
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
                </InfiniteScroll>
                <CommentDialog
                    open={openCommetDialog}
                    setOpen={setOpenCommentDialog}
                    postId={postCommentId}
                />

            </Box>
        </Box >

    )
}

export default Post