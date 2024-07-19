import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import './style/profile.css'
import defaultUser from './user.png'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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

const UserProfile = () => {
    const posts = useAppSelector((state) => state.posts)
    const dispatch = useAppDispatch()
    const [openCommetDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openPostPhotoDialog, setOpenPostPhotoDialog] = useState<any>({})
    const [postCommentId, setPostCommentId] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
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

    return (
        <Box>
            <Box className='profile-container'>
                <Box className="profile-details">
                    <Box className="pd-left">
                        <Box className="pd-row">
                            <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" className="pd-image" />
                            <Box>
                                <Typography variant='h3'>Jack Nicholson</Typography>
                                <Typography>120 Friend - 20 mutual</Typography>
                                <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                            </Box>
                        </Box>
                    </Box>
                    <Box className="pd-right">
                        <button type="button">
                            <PersonAddIcon /> Friends
                        </button>
                        <button type="button">
                            <SendRoundedIcon />
                            Message
                        </button>
                        <br />
                        <a href="#">
                            <MoreHorizIcon />
                        </a>
                    </Box>
                </Box>

                <Box className="profile-info">
                    <Box className="info-col">
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
                                <a href="">All Friends</a>
                            </Box>
                            <p>120 (10 mutuai)</p>
                            <Box className="friends-box">
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />
                                    <p>Joseph N</p>
                                </Box>
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />

                                    <p>Nathan N</p>
                                </Box>
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />

                                    <p>George D</p>
                                </Box>
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />

                                    <p>Francis L</p>
                                </Box>
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />

                                    <p>Anthony E</p>
                                </Box>
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />

                                    <p>Micheal A</p>
                                </Box>
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />

                                    <p>Edward M</p>
                                </Box>
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />

                                    <p>Bradon C</p>
                                </Box>
                                <Box>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/react-ef343.appspot.com/o/files%2Fsn_5db837ee-f7c2-4195-a2e6-3df61d725449?alt=media&token=9e43ec2a-3432-40cc-b3d6-628b041aa342" />

                                    <p>James Doe</p>
                                </Box>
                            </Box>
                        </Box>

                    </Box>

                    <Box className="post-col">
                        {posts.posts.map((post) => (
                            <Box className='postContainer' key={post.id}>
                                <Card sx={{ width: 500, marginBottom: 2 }}>

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
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default UserProfile