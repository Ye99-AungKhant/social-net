import { Box, IconButton, Modal, Typography } from '@mui/material'
import "./style/post.css"
import defaultUser from './user.png'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    story: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    p: 4,
};
const StoryTextTextDialog = ({ open, setOpen, story }: Props) => {

    const closeModal = () => {
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='storyViewBackground'>
                <Box sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography color={'white'}>{story}</Typography>
                </Box>
            </Box>
        </Modal>
    )
}

export default StoryTextTextDialog