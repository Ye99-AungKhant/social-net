import { Box, Button, FormControl, IconButton, Modal, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import "./style/post.css"
import "./style/comment.css"
import defaultUser from './user.png'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendIcon from '@mui/icons-material/Send';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuPopup from './MenuPopup';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createComment, removeAllComment, removeEditComment, updateComment } from '../store/slices/commentSlice';
import { EditComment } from '../types/comment';


interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    postId: number
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pl: 4,
    pr: 4,
    pb: 4,
};
const CommentDialog = ({ open, setOpen, postId }: Props) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [showMore, setShowMore] = useState<any>({})
    const [comment, setComment] = useState({ content: '' })
    const { editComment } = useAppSelector((state) => state.comments)
    const { authUser } = useAppSelector((state) => state.auth)
    const { comments } = useAppSelector((state) => state.comments)
    const [commentId, setCommentId] = useState<number>(0)
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null);

    const closeModal = () => {
        setOpen(false)
        dispatch(removeAllComment())
    }

    const handleMenu = (Id: number, userId: number) => {
        if (userId === authUser?.id) {
            setCommentId(Id)
            setOpenMenu(!openMenu)
        }
        return
    }

    useEffect(() => {
        if (editComment) {
            setComment({ content: editComment.content })
        }

    }, [editComment])

    const isCreateOrNewComment = () => {
        if (editComment) {
            if (editComment.content != comment.content) {
                dispatch(updateComment({ id: editComment.id, content: comment.content }))
                if (inputRef.current) {
                    inputRef.current.value = '' // Clear input field
                }
                setComment({ content: '' })
            }
        } else {
            handleCreateComment()
        }
    }

    const handleCreateComment = () => {
        if (comment !== null) {
            const userId = authUser?.id
            const { content } = comment
            const commentpayload = { content, userId, postId }
            dispatch(createComment(commentpayload))
            if (inputRef.current) {
                inputRef.current.value = '' // Clear input field
            }
            setComment({ content: '' })
        }
    }

    const handleCommentToggle = (id: number) => {
        setShowMore((prevState: any) => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    };

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='commentContainer'>
                <Box className='commentBox parentcontainer'>
                    <Box className='createPostHeader'>
                        <Typography sx={{ color: '#626262', fontWeight: 'bold', marginTop: 1 }}>
                            Comments
                        </Typography>
                        <IconButton sx={{ position: 'absolute', right: 0 }}
                            onClick={closeModal}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Box>

                    {comments.map((comment) => (
                        <div className='commentShowBox' key={comment.id}>

                            <div className="postProfile commentProfile">
                                <img src={comment.user.profile ? comment.user.profile : defaultUser} />
                                <div className='profileText'>
                                    <div className='commentTextHeader'>
                                        <p>{comment?.user?.name}</p>
                                        <p style={{ marginLeft: '5px' }} className='commentMenu' onClick={() => handleMenu(comment.id, comment.user_id)}>▼</p>
                                    </div>
                                    <div className='commentText'>
                                        {showMore[comment.id] ? comment.content : `${comment.content.substring(0, 120)}`}

                                        {comment.content.length > 120 ?
                                            <button className='showMoreBtn' onClick={() => handleCommentToggle(comment.id)}>
                                                {showMore[comment.id] ? "See less" : "... See more"}
                                            </button> : ''
                                        }

                                        {commentId === comment.id &&
                                            < MenuPopup
                                                editId={comment.id}
                                                deleteId={comment.id}
                                                open={openMenu}
                                                setOpen={setOpenMenu}
                                            />
                                        }
                                    </div>
                                    <p className='postDate'>{comment.date}</p>

                                </div>
                            </div>
                        </div>
                    ))}
                </Box>
                <div className='commentInputBox'>
                    <input type="text" className='commentInput' placeholder='Write comment...' autoFocus
                        value={comment.content}
                        ref={inputRef}
                        onChange={(e) => { setComment({ ...comment, content: e.target.value }) }}
                    />
                    <button className='commentSentBtn' onClick={isCreateOrNewComment}><SendIcon /></button>
                </div>
            </Box>
        </Modal>
    )
}

export default CommentDialog