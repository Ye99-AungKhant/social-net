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
import { Divider, IconButton } from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { addPost } from '../store/slices/postSlice';
import EmojiPicker from 'emoji-picker-react';
import zIndex from '@mui/material/styles/zIndex';

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
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [postContent, setPostContent] = useState<string>()

    const dispatch = useAppDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const closeModal = () => {
        setOpen(false)
        setSelectedImages([])
    }

    const onSelectFile = (event: any) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file: any) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages: any) => previousImages.concat(imagesArray));
        event.target.value = "";
    };

    const deletePreviewImageHandler = (image: any) => {
        setSelectedImages(selectedImages.filter((e: any) => e !== image));
        URL.revokeObjectURL(image);
    }

    const showEmojiPicker = () => {
        setOpenEmojiPicker(true)
    }

    const handleCreatePost = () => {
        dispatch(addPost({
            content: postContent ? postContent : '',
            image: selectedImages
        }))
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='createPostBox'>
                {/* {openEmojiPicker && <EmojiPicker />} */}
                <Box className='createPostHeader'>
                    <Typography sx={{ color: '#626262', fontWeight: 'bold', marginTop: 1 }}>
                        Create Post
                    </Typography>
                    <IconButton sx={{ position: 'absolute', right: 0 }}
                        onClick={closeModal}
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
                        <textarea placeholder="Whant's on your mind, John?" onChange={(e) => {
                            setPostContent(e.target.value)
                        }}>
                        </textarea>
                        <div className="imagePreviewContainer">
                            {selectedImages &&
                                selectedImages.map((image: any, index: any) => {
                                    return (
                                        <div className='imagePreviewBox'>
                                            <IconButton sx={{ position: 'absolute', right: 0 }}
                                                onClick={() => deletePreviewImageHandler(image)}
                                            >
                                                <CloseRoundedIcon className='removePreviewImage' />
                                            </IconButton>
                                            <img src={image} height="200" alt="upload" className='imagePreview' />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <Divider />
                        <div className="add-post-links">
                            <label className='file-input-container' onChange={onSelectFile} htmlFor="formId">
                                <CameraAltIcon className='choosePhotoEmoji' />
                                <input
                                    type='file'
                                    id="formId"
                                    multiple accept="image/png , image/jpeg, image/webp"
                                    hidden
                                />
                                Photo/Video
                            </label>

                            <label className='file-input-container' onClick={showEmojiPicker}>
                                <Emoji className='choosePhotoEmoji' />
                                Feeling/Activity
                            </label>
                        </div>
                    </div>
                    <input
                        type='button'
                        className='sharedPostBtn'
                        value='Share Post'
                        onClick={handleCreatePost}
                    />
                </div>

            </Box>

        </Modal>
    );
}

export default PostCreate