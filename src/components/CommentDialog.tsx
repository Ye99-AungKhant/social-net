import { Box, Button, FormControl, IconButton, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./style/post.css"
import "./style/comment.css"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendIcon from '@mui/icons-material/Send';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuPopup from './MenuPopup';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createComment } from '../store/slices/commentSlice';


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
    const [comment, setComment] = useState({ content: '' })
    const { authUser } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const closeModal = () => {
        setOpen(false)
    }

    const handleMenu = (e: any) => {
        setOpenMenu(true)
    }

    const handleCreateComment = () => {
        if (comment !== null) {
            const userId = authUser?.id
            const { content } = comment
            const commentpayload = { content, userId, postId }
            dispatch(createComment(commentpayload))
        }
    }

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='commentBox'>
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

                <div className='commentShowBox'>
                    <div className="postProfile commentProfile">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" />
                        <div className='profileText'>
                            <p>Ye Aung Khant</p>
                            <div className='commentText' onClick={handleMenu}>Hello, I'm full-stack developer and always busy.I'm full-stack apple developer and always busy.I'm full-stack developer and always busy.</div>
                            <p className='postDate'>10 min</p>
                        </div>
                    </div>
                    <MenuPopup open={openMenu} setOpen={setOpenMenu} />
                </div>

                <div className='commentInputBox'>
                    <input type="text" className='commentInput' placeholder='Write comment...' autoFocus
                        onChange={(e) => { setComment({ ...comment, content: e.target.value }) }}
                    />
                    <button className='commentSentBtn' onClick={handleCreateComment}><SendIcon /></button>
                </div>
            </Box>
        </Modal>
    )
}

export default CommentDialog