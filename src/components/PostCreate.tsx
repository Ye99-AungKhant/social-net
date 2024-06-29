import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Emoji from '@mui/icons-material/SentimentVerySatisfiedRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./style/post.css"
import { IconButton } from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { addPost } from '../store/slices/postSlice';

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

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostCreate = ({ open, setOpen }: Props) => {
    const [age, setAge] = React.useState('');
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const dispatch = useAppDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const onSelectFile = (event: any) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file: any) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages: any) => previousImages.concat(imagesArray));

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    const handleCreatePost = () => { }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='createPostBox'>
                <Box className='createPostHeader'>
                    <Typography sx={{ color: '#626262', fontWeight: 'bold', marginTop: 1 }}>
                        Create Post
                    </Typography>
                    <IconButton sx={{ position: 'absolute', right: 0 }}
                        onClick={() => setOpen(false)}
                    >
                        <CloseRoundedIcon />
                    </IconButton>

                </Box>
                <div className="write-post-container">
                    <div className="postProfile">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" />
                        <div className='profileText'>
                            <p>Ye Aung Khant</p>

                            <select name="privacy" id="privacy" className='postPrivacy'>
                                <option value="Public">Public</option>
                                <option value="Friend">Friend</option>
                                <option value="Onlyme">Onlyme</option>
                            </select>

                        </div>
                    </div>

                    <div className="post-intput-container">
                        <textarea placeholder="Whant's on your mind, John?">
                        </textarea>
                        <div className="add-post-links">
                            <input
                                type='file'
                                multiple accept="image/png , image/jpeg, image/webp"
                                onChange={onSelectFile} />
                            <CameraAltIcon className='choosePhotoEmoji' />Photo/Video

                            <a href="#"><Emoji className='choosePhotoEmoji' />Feeling/Activity</a>
                        </div>
                    </div>
                    <input
                        type='button'
                        className='sharedPostBtn'
                        value='Share Post'
                        onClick={handleCreatePost}
                    />
                    {selectedImages &&
                        selectedImages.map((image: any, index: any) => {
                            return (
                                <div key={image} className="image">
                                    <img src={image} height="200" alt="upload" />
                                    {/* <button onClick={() => deleteHandler(image)}>
                                                delete image
                                            </button> */}
                                    <p>{index + 1}</p>
                                </div>
                            );
                        })}
                </div>
            </Box>
        </Modal>
    );
}

export default PostCreate