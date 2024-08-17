import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Emoji from '@mui/icons-material/SentimentVerySatisfiedRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import "./style/post.css"
import defaultUser from '../utils/default-avatar.jpg'
import { Divider, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import EmojiPicker from 'emoji-picker-react';
import { createPost } from '../store/slices/postSlice';
import { imageDb } from '../config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { PostCreate as PostData } from '../types/post';
import { createStory } from '../store/slices/storySlice';

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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    type: string
}

const PostCreate = ({ open, setOpen, type }: Props) => {
    const [selectedImages, setSelectedImages] = useState<any>([])
    const [selectedImagesUpload, setSelectedImagesUpload] = useState<any>([])
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const { authUser } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const [storySelectType, setStorySelectType] = useState(false)
    const [newPost, setNewPost] = useState<PostData>({
        status: 'Public',
        content: '',
        image: [],
    })

    const closeModal = () => {
        setOpen(false)
        setSelectedImages([])
        setSelectedImagesUpload([])
        setNewPost({
            status: 'Public',
            content: '',
            image: [],
        })
    }

    const onSelectFile = (event: any) => {
        if (type == 'Post') {
            const selectedFiles = event.target.files;
            const selectedFilesArray = Array.from(selectedFiles);
            const imagesArray = selectedFilesArray.map((file: any) => {
                return URL.createObjectURL(file);
            });
            setSelectedImages((previousImages: any) => previousImages.concat(imagesArray));
            setSelectedImagesUpload(selectedFilesArray)
            event.target.value = "";
        } else {
            const selectedFiles = event.target.files[0];
            const selectedFilesArray = Array.from(selectedFiles);
            const imagesArray = URL.createObjectURL(selectedFiles);
            setSelectedImages([imagesArray]);
            setSelectedImagesUpload([selectedFiles])
            event.target.value = "";
        }
    };

    const deletePreviewImageHandler = (image: any) => {
        setSelectedImages(selectedImages.filter((e: any) => e !== image));
        URL.revokeObjectURL(image);
    }

    const showEmojiPicker = () => {
        setOpenEmojiPicker(true)
    }

    const handleCreatePost = async () => {

        try {

            if (selectedImagesUpload.length !== 0 && type == 'Post') {
                const uploadPromises = await selectedImagesUpload.map(async (image: any) => {
                    const imgRef = ref(imageDb, `files/sn_${uuid()}`)
                    const uploaded = await uploadBytes(imgRef, image)
                    return getDownloadURL(uploaded.ref);
                })
                let postPayloadData: any
                let downloadUrl: any = []
                downloadUrl = await (Promise.all(uploadPromises))
                setNewPost((prevState) => {
                    postPayloadData = { ...prevState, image: downloadUrl };
                    return postPayloadData;
                });


                dispatch(createPost(postPayloadData))
                console.log('post', postPayloadData);
                closeModal()
            } else if (selectedImagesUpload.length === 0 && type == 'Post') {
                dispatch(createPost({ ...newPost }))
                closeModal()
            }
            if (selectedImagesUpload.length !== 0 && type == 'Story') {
                console.log('story post', selectedImagesUpload);
                const uploadPromises = await selectedImagesUpload.map(async (image: any) => {
                    const imgRef = ref(imageDb, `files/sn_${uuid()}`)
                    const uploaded = await uploadBytes(imgRef, image)
                    return getDownloadURL(uploaded.ref);
                })

                let postPayloadData: any
                let downloadUrl: any = []
                downloadUrl = await (Promise.all(uploadPromises))
                setNewPost((prevState) => {
                    postPayloadData = { ...prevState, image: downloadUrl };
                    return postPayloadData;
                });

                dispatch(createStory(postPayloadData))
                console.log('story upload', postPayloadData);
                closeModal()
            } else if (selectedImagesUpload.length === 0 && type == 'Story') {
                dispatch(createStory({ ...newPost }))
                closeModal()
            }


        } catch (error) {
            console.error("Error uploading images:", error);
        }
    }

    const storyTypeToggle = () => {
        setStorySelectType(!storySelectType)
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
                        Create {type}
                    </Typography>
                    <IconButton sx={{ position: 'absolute', right: 0 }}
                        onClick={closeModal}
                    >
                        <CloseRoundedIcon />
                    </IconButton>

                </Box>
                <div className="write-post-container">
                    <div className="postProfile">
                        <img src={authUser?.profile ? authUser.profile : defaultUser} />
                        <div className='profileText'>
                            <p>{authUser?.name}</p>

                            <select name="status" id="privacy" className='postPrivacy' onChange={(e) => {
                                setNewPost({ ...newPost, status: e.target.value })
                            }}>
                                <option value="Public">Public</option>
                                <option value="Friend">Friend</option>
                                <option value="Onlyme">Onlyme</option>
                            </select>
                        </div>
                        {type === 'Story' &&
                            <div className="storyType">
                                <button type='button' className={!storySelectType ? 'storyToggleBtn storyTypeBtn' : 'storyTypeBtn'} onClick={storyTypeToggle}>Text</button>
                                <button type='button' className={storySelectType ? 'storyToggleBtn storyTypeBtn' : 'storyTypeBtn'} onClick={storyTypeToggle}>Photo</button>
                            </div>
                        }

                    </div>

                    <div className="post-intput-container">

                        {!storySelectType ?
                            <textarea placeholder="Whant's on your mind, John?" onChange={(e) => {
                                setNewPost({ ...newPost, content: e.target.value })
                            }} className='textareaBox'>
                            </textarea>
                            : <div></div>
                        }
                        <Box className="imagePreviewContainer" sx={{ position: 'relative' }}>

                            {selectedImages &&
                                selectedImages.map((image: any, index: any) => {
                                    return (
                                        <div className='imagePreviewBox' key={index}>
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

                        </Box>
                        <Divider />
                        <div className="add-post-links">
                            {type === 'Story' ? selectedImages.length == 0 && storySelectType &&
                                <label className='file-input-container' onChange={onSelectFile} htmlFor="formId">
                                    <CameraAltIcon className='choosePhotoEmoji' />
                                    <input
                                        type='file'
                                        id="formId"
                                        multiple
                                        accept="image/png , image/jpeg, image/webp"
                                        hidden
                                    />
                                    Photo/Video
                                </label>
                                : ''
                            }
                            {type === 'Post' &&
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
                            }

                            <label className='file-input-container' onClick={showEmojiPicker}>
                                <Emoji className='choosePhotoEmoji' />
                                Feeling/Activity
                            </label>
                        </div>
                    </div>
                    <input
                        type='button'
                        className='sharedPostBtn'
                        value={`Share ${type}`}
                        onClick={handleCreatePost}
                    />
                </div>

            </Box>

        </Modal>
    );
}

export default PostCreate