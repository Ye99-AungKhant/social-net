import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './style/profile.css'
import defaultUser from './user.png'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuPopup from './MenuPopup';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatIcon from '@mui/icons-material/Chat';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { postLike } from '../store/slices/postSlice';
import { fetchComment } from '../store/slices/commentSlice';
import { postLoading, profileLoading } from './SkeletonComponent';
import PostPhotoDialog from './PostPhotoDialog';
import Navbar from './Navbar';
import { fetchData } from '../store/slices/appSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useParams } from 'react-router-dom';
import { profileDataFetch, profilePostFetch, removePost, unfriend } from './../store/slices/profileDataSlice';
import LeftSidebar from './LeftSidebar';
import ConfirmDialog from './ConfirmDialog';

const UserProfile = () => {
    const { posts, profileDetail, friendLists } = useAppSelector((state) => state.profileData)
    const dispatch = useAppDispatch()
    const [openCommetDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openComfirmDialog, setOpenComfirmDialog] = useState<boolean>(false)
    const [openPostPhotoDialog, setOpenPostPhotoDialog] = useState<any>({})
    const [postCommentId, setPostCommentId] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [postMenuId, setPostMenuId] = useState<number>(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [showMore, setShowMore] = useState<any>({})
    const { authUser } = useAppSelector((state) => state.auth)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const { profileId } = useParams();
    const profileIdNum = Number(profileId)

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

    const handleLoaded: React.ReactEventHandler<HTMLImageElement> = () => {
        setLoading(false)
    }

    const handlePostMenu = (postId: number) => {
        setOpenMenu(!openMenu)
        setPostMenuId(postId)
    }

    const handlePostToggle = (postId: number) => {
        setShowMore((prevState: any) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }))
    };

    const handleComfirmDialog = () => {
        setOpenComfirmDialog(true)
    }

    const handleConfirmUnfriend = () => {
        dispatch(unfriend(profileId))
    }

    useEffect(() => {
        dispatch(removePost())
        dispatch(fetchData({}))
        dispatch(profileDataFetch(profileId))
        fetchPostData()
    }, [profileId])

    const fetchPostData = async () => {
        console.log('post loaded');
        try {
            let payload = { page, profileId }
            dispatch(profilePostFetch(payload)).then((res) => res.payload).then((data) => {
                if (data != null && data.length == 0) {
                    setHasMore(false);
                }
            })
            setPage((prevPage) => prevPage + 1);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <Box>
            <Navbar />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <LeftSidebar />
                <Box className='profile-container' sx={{ height: 500 }}>
                    <Box className="profile-details">
                        <Box className="pd-left">
                            <Box className="pd-row">
                                <img src={profileDetail?.profile ? profileDetail.profile : defaultUser} className="pd-image" />
                                <Box>
                                    <Typography variant='h3'>{profileDetail?.name}</Typography>
                                    <Typography>{friendLists.length} Friend</Typography>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                </Box>
                            </Box>
                        </Box>
                        {authUser?.id != profileId &&
                            <Box className="pd-right">
                                {friendLists.map((friendlist) => (
                                    friendlist.id == authUser?.id ?
                                        <button type="button" onClick={handleComfirmDialog}>
                                            <PersonRoundedIcon sx={{ marginRight: 1 }} />Friend
                                        </button>
                                        : <button type="button">
                                            <PersonAddIcon sx={{ marginRight: 1 }} /> Add Friend
                                        </button>

                                ))}
                                {/* <button type="button">
                                    <PersonAddIcon /> Friends
                                </button> */}
                                <button type="button">
                                    <SendRoundedIcon />
                                    Message
                                </button>
                                <br />
                                <a href="#">
                                    <MoreHorizIcon />
                                </a>
                            </Box>
                        }
                    </Box>

                    <Box className="profile-info">
                        <Box className="info-col" sx={{ height: 500 }}>
                            <Box className="profile-intro">
                                <h3>Bio</h3>
                                <Typography className="intro-text">
                                    Believe in yourself and you can do unbelieveable thing.
                                    <img src="images/feeling.png" />
                                </Typography>
                                <hr />
                                <ul>
                                    <li>
                                        <img src="images/profile-job.png" /> Director at 99media Ltd
                                    </li>
                                    <li>
                                        <img src="images/profile-study.png" />
                                        Studied at Amity University
                                    </li>
                                    <li>
                                        <img src="images/profile-study.png" />
                                        Went to DPS Delhi
                                    </li>
                                    <li>
                                        <img src="images/profile-home.png" />
                                        Lives in Bangalore, India
                                    </li>
                                    <li>
                                        <img src="images/profile-location.png" />
                                        From Bangalore, India
                                    </li>
                                </ul>
                            </Box>

                            <Box className="profile-intro">
                                <Box className="title-box">
                                    <h3>Photos</h3>
                                    <a href="">All Photos</a>
                                </Box>
                                <Box className="photo-box">
                                    <Box>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    </Box>
                                    <Box>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    </Box>
                                    <Box>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    </Box>
                                    <Box>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    </Box>
                                    <Box>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    </Box>
                                    <Box>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="profile-intro">
                                <Box className="title-box">
                                    <h3>Friends</h3>
                                    <a href="#">All Friends</a>
                                </Box>
                                <p>{friendLists.length}</p>
                                <Box className="friends-box">
                                    {friendLists.map((friendlist) => (
                                        <Box className='item' key={friendlist.id}>
                                            <Link to={`/profile/${friendlist.id}`}>
                                                <img src={friendlist.profile ? friendlist.profile : defaultUser} />
                                                <p>{friendlist.name}</p>
                                            </Link>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                        </Box>

                        <Box className="post-col" id='containerBoxDiv'>

                            <InfiniteScroll
                                dataLength={posts.length}
                                next={fetchPostData}
                                hasMore={hasMore}
                                loader=''
                                endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                                scrollableTarget="containerBoxDiv"
                            >
                                {posts.map((post) => (
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
                                                        <img
                                                            src={post.user.profile ? post.user.profile : defaultUser}
                                                            alt="profile"
                                                            onLoad={handleLoaded}
                                                        />
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
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ConfirmDialog
                open={openComfirmDialog}
                setOpen={setOpenComfirmDialog}
                handleConfirmUnfriend={handleConfirmUnfriend}
            />
        </Box>
    )
}

export default UserProfile