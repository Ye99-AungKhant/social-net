import { Box, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import "./style/post.css"
import "./style/comment.css"
import "./style/PhotoCarousel.css"
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress';



interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    photo: any[]
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 600,
    transform: 'translate(-50%, -50%)',
};
const PostPhotoDialog = ({ open, setOpen, photo }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
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

    const handleLoaded: React.ReactEventHandler<HTMLImageElement> = () => {
        setLoading(false)
    }

    return (
        <Modal
            open={open}
            onClose={closeModal}
        >
            <Box sx={style}>

                <div className="carousel">
                    {loading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', }} />}
                    {photo.length > 1 && <ArrowBackIosRounded onClick={prevSlide} className="arrow arrow-left" />}
                    {photo.map((item, idx) => {
                        return (
                            <img
                                src={item.url}
                                alt='photo'
                                key={idx}
                                className={slide === idx ? "slide" : "slide slide-hidden"}
                                onLoad={handleLoaded}
                            />
                        );
                    })}
                    {photo.length > 1 && <ArrowForwardIosRounded
                        onClick={nextSlide}
                        className="arrow arrow-right"
                    />}
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