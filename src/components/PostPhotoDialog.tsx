import { Box, Button, FormControl, IconButton, Modal, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import "./style/post.css"
import "./style/comment.css"
import "./style/PhotoCarousel.css"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuPopup from './MenuPopup';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createComment, removeAllComment, removeEditComment, updateComment } from '../store/slices/commentSlice';
import { EditComment } from '../types/comment';
import { postImage } from '../types/app';


interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    photo: postImage[]
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 600,
    transform: 'translate(-50%, -50%)',
};
const PostPhotoDialog = ({ open, setOpen, photo }: Props) => {

    const closeModal = () => {
        setOpen(false)
    }

    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === photo.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? photo.length - 1 : slide - 1);
    };


    return (
        <Modal
            open={open}
            onClose={closeModal}
        >
            <Box sx={style}>
                <div className="carousel">
                    <ArrowBackIosRounded onClick={prevSlide} className="arrow arrow-left" />
                    {photo.map((item, idx) => {
                        return (
                            <img
                                src={item.url}
                                alt='photo'
                                key={idx}
                                className={slide === idx ? "slide" : "slide slide-hidden"}
                            />
                        );
                    })}
                    <ArrowForwardIosRounded
                        onClick={nextSlide}
                        className="arrow arrow-right"
                    />
                    <span className="indicators">
                        {photo.map((_, idx) => {
                            return (
                                <button
                                    key={idx}
                                    className={
                                        slide === idx ? "indicator" : "indicator indicator-inactive"
                                    }
                                    onClick={() => setSlide(idx)}
                                ></button>
                            );
                        })}
                    </span>
                </div>
            </Box>
        </Modal>
    )
}

export default PostPhotoDialog