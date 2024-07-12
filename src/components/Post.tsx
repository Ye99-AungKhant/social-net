import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import "./style/post.css"
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatIcon from '@mui/icons-material/Chat';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import CommentDialog from './CommentDialog';
import { postLike } from '../store/slices/postSlice';
import { fetchComment } from '../store/slices/commentSlice';

const Post = () => {
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            cols: 2,
        },

    ];
    const posts = useAppSelector((state) => state.posts)
    const dispatch = useAppDispatch()
    const [openCommetDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [postCommentId, setPostCommentId] = useState<number>(0)
    const { authUser } = useAppSelector((state) => state.auth)

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
                            {post.image != null &&
                                <ImageList
                                    sx={{ width: 500, height: 250, margin: 0 }}
                                    variant="quilted"
                                    cols={4}
                                    rowHeight={121}
                                >
                                    {itemData.map((item) => (
                                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                            <img
                                                {...srcset(item.img, 121, item.rows, item.cols)}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            }
                            <CardContent sx={{ margin: 0, padding: 0, minHeight: 100, width: '100%' }}>
                                <div className='postHeader'>
                                    <div className="postProfile">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="post" />
                                        <div className='profileText'>
                                            <p>{post.user.name}</p>
                                            <p className='postDate'>{post.date}</p>
                                        </div>
                                    </div>
                                    <div className='postAction'>
                                        <div className='postLike'>

                                            <FavoriteRoundedIcon onClick={() => handleLike(post.id)}
                                                className={post.liked.find((like: any) => (like.user_id == authUser?.id)) ? 'active' : ''} />
                                            <p className='postActionText'>{post.like_count}</p>
                                        </div>
                                        <div className='postComment' onClick={() => handleCommentDialog(post.id)}>
                                            <ChatIcon />
                                            <p className='postActionText'>987</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='postContent'>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.content}
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