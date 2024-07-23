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
import { friendPostFetch, postLike } from '../store/slices/postSlice';
import { fetchComment } from '../store/slices/commentSlice';
import MenuPopup from './MenuPopup';
import PostPhotoDialog from './PostPhotoDialog';
import { postFetch } from '../store/slices/postSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { userSlice } from './../store/slices/userSlice';
import { storyFetch } from '../store/slices/storySlice';
import PostCreate from './PostCreate';
import StoryTextTextDialog from './StoryTextDialog';
import { postLoading, profileLoading, storyLoading, storyUploadLoading } from './SkeletonComponent';
import { Link } from 'react-router-dom';


const Post = () => {
    const posts = useAppSelector((state) => state.posts)
    const { stories } = useAppSelector((state) => state.stories)
    const dispatch = useAppDispatch()
    const [openCommetDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openPostPhotoDialog, setOpenPostPhotoDialog] = useState<any>({})
    const [openStoryPhotoDialog, setOpenStoryPhotoDialog] = useState<any>({})
    const [openStoryTextDialog, setOpenStoryTextDialog] = useState<any>({})
    const [postCommentId, setPostCommentId] = useState<number>(0)
    const [postMenuId, setPostMenuId] = useState<number>(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [showMore, setShowMore] = useState<any>({})
    const { authUser } = useAppSelector((state) => state.auth)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [storyHasMore, setStoryHasMore] = useState(true);
    const [storyPage, setStoryPage] = useState(1);
    const [openStoryCreate, setOpenStoryCreate] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [filterPost, setFilterPost] = useState<string>('friendPosts')
    const maxPhotos = 4;

    const handleLike = (postId: number) => {
        let postData = { filterPost, postId }
        dispatch(postLike(postData))
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

    const handleStoryPhotoDialog = (storyId: number) => {
        setOpenStoryPhotoDialog((prevState: any) => ({
            ...prevState,
            [storyId]: !prevState[storyId]
        }))
    }

    const handleStoryTextDialog = (storyId: number) => {
        setOpenStoryTextDialog((prevState: any) => ({
            ...prevState,
            [storyId]: !prevState[storyId]
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
        fetchStoryData();
    }, [])
    useEffect(() => {
        fetchPostData();
    }, [filterPost]);

    const fetchPostData = async () => {
        console.log('post loaded');
        try {
            if (filterPost == 'posts') {
                dispatch(postFetch(page)).then((res) => res.payload).then((data) => {
                    if (data != null && data.length == 0) {
                        setHasMore(false);
                    }
                })
                setPage((prevPage) => prevPage + 1);
            } else {
                dispatch(friendPostFetch(page)).then((res) => res.payload).then((data) => {
                    if (data != null && data.length == 0) {
                        setHasMore(false);
                    }
                })
                setPage((prevPage) => prevPage + 1);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchStoryData = async () => {
        console.log('story loaded');
        try {
            dispatch(storyFetch(storyPage)).then((res) => res.payload).then((data) => {
                if (data.length == 0) {
                    setStoryHasMore(false);
                }
            })
            setStoryPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCreateStory = () => {
        if (!openStoryCreate)
            return setOpenStoryCreate(true)
    }

    const handleLoaded: React.ReactEventHandler<HTMLImageElement> = () => {
        setLoading(false)
    }

    const handleFilterPost = (status: string) => {
        if (status === 'All') {
            if (filterPost == 'posts') return
            return setFilterPost('posts')
        }

        return setFilterPost('friendPosts')
    }

    return (
        <Box id='containerBoxDiv' className='containerBox'>

            <Box className='storySection'>
                <InfiniteScroll
                    dataLength={stories != null ? stories.length : 0}
                    next={fetchStoryData}
                    hasMore={storyHasMore}
                    loader=''
                    scrollableTarget="storyBoxDiv"
                >
                    <Box id='storyBoxDiv' className='storyBox'>
                        <div className='story'>
                            <div className='backdrop'>
                                {loading && storyUploadLoading}
                                <img
                                    src={authUser?.profile ? authUser?.profile : ''}
                                    alt=""
                                    className='storyData'
                                    onLoad={handleLoaded}
                                />
                            </div>
                            <div onClick={handleCreateStory}>
                                <AddCircleRoundedIcon className='uploadStory' sx={{ fontSize: 40 }} />
                            </div>
                            <p>Create Story</p>
                        </div>

                        {stories.map((story) => (

                            <div key={story.id} className='story'>
                                <p className='storyName'>{story.user.name}</p>
                                {story.content ?
                                    <div className="backdrop storyText" onClick={() => handleStoryTextDialog(story.id)}>
                                        <div className="storyTextBackground"></div>
                                        <div className="storyTextContent">
                                            <p>{story.content.substring(0, 60).concat('...')}</p>
                                        </div>
                                    </div>
                                    : <div className='backdrop' onClick={() => handleStoryPhotoDialog(story.id)}>
                                        {loading && storyLoading}
                                        <img
                                            src={story.url !== null ? story.url : ''}
                                            alt="story"
                                            className='storyData'
                                            onLoad={handleLoaded}
                                        />
                                    </div>

                                }

                                {loading && profileLoading}
                                <img
                                    src={story.user.profile ? story.user.profile : defaultUser}
                                    alt="story"
                                    className='storyProfile'
                                    onLoad={handleLoaded}
                                />
                                <p className='storyName'>{story.user.name}</p>
                                {openStoryPhotoDialog[story.id] && <PostPhotoDialog
                                    open={true}
                                    setOpen={setOpenStoryPhotoDialog}
                                    photo={[story]}
                                />}
                                {openStoryTextDialog[story.id] && <StoryTextTextDialog
                                    open={true}
                                    setOpen={setOpenStoryTextDialog}
                                    story={story.content}
                                />}
                            </div>
                        ))}

                    </Box>
                </InfiniteScroll>
            </Box>

            <Box className='postSection'>
                <Box className='postFilter'>
                    <button type='button' className={`filterBtn ${filterPost == 'posts' ? 'filterBtnActive' : ''}`} onClick={() => handleFilterPost('All')}>All</button>
                    <button type='button' className={`filterBtn ${filterPost !== 'posts' ? 'filterBtnActive' : ''}`} onClick={() => handleFilterPost('Following')}>Following</button>
                </Box>

                <InfiniteScroll
                    dataLength={posts.posts.length}
                    next={fetchPostData}
                    hasMore={hasMore}
                    loader=''
                    endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                    scrollableTarget="containerBoxDiv"
                >
                    {filterPost == 'posts' && posts.posts.map((post) => (
                        <Box className='postContainer' key={post.id}>
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
                        </Box>
                    ))}

                    {filterPost == 'friendPosts' && posts.friendPosts.map((post) => (
                        <Box className='postContainer' key={post.id}>
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
                        </Box>
                    ))}
                </InfiniteScroll>
                <CommentDialog
                    open={openCommetDialog}
                    setOpen={setOpenCommentDialog}
                    postId={postCommentId}
                />

            </Box>

            <PostCreate open={openStoryCreate} setOpen={setOpenStoryCreate} type='Story' />
        </Box >

    )
}

export default Post