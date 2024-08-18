import { Box, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import "./style/post.css"
import "./style/comment.css"
import "./style/PhotoCarousel.css"
import CircularProgress from '@mui/material/CircularProgress';



interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    photo: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 600,
    transform: 'translate(-50%, -50%)',
};
const ProfileViewDialog = ({ open, setOpen, photo }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const closeModal = () => {
        setOpen(false)
    }
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
                    <img
                        src={photo}
                        alt='profile'
                        onLoad={handleLoaded}
                    />

                </div>
            </Box>
        </Modal>
    )
}

export default ProfileViewDialog