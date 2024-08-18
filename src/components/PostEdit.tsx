import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Emoji from '@mui/icons-material/SentimentVerySatisfiedRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import "./style/post.css"
import defaultUser from './user.png'
import { CircularProgress, Divider, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import EmojiPicker from 'emoji-picker-react';
import { createPost } from '../store/slices/postSlice';
import { imageDb } from '../config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { PostCreate as PostData, PostEditData } from '../types/post';
import { createStory } from '../store/slices/storySlice';
import { Post } from '../types/app';
import { deletePostImage, updatePost } from '../store/slices/profileDataSlice';

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
    post: Post
}

const PostEdit = ({ open, setOpen, post }: Props) => {
    const [selectedImages, setSelectedImages] = useState<any>([])
    const [selectedImagesUpload, setSelectedImagesUpload] = useState<any>([])
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const { authUser } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const [newPost, setNewPost] = useState<PostEditData>(post)
    const [postBtnDisable, setPostBtnDisable] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setNewPost({
            id: post.id,
            content: post.content,
            status: post.status,
            image: post.image,
        })
        const imagesArray = post.image?.map((file: any) => {
            return file.url
        })
        setSelectedImages(imagesArray)
    }, [post]);

    const closeModal = () => {
        setOpen(false)
        setSelectedImages([])
        setSelectedImagesUpload([])
        setNewPost({
            id: 0,
            content: '',
            status: 'Public',
            image: [],
        })
    }

    const onSelectFile = (event: any) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imagesArray = selectedFilesArray.map((file: any) => {
            return URL.createObjectURL(file);
        });
        setSelectedImages((previousImages: any) => previousImages.concat(imagesArray));
        setSelectedImagesUpload([...selectedImages, ...selectedFilesArray])
        event.target.value = "";
    };

    useEffect(() => {
        if (selectedImagesUpload.length > 0 || post.content != newPost.content) {
            return setPostBtnDisable(true)
        }
        setPostBtnDisable(false)
        console.log('setSelectedImagesUpload', selectedImagesUpload);

    }, [selectedImagesUpload, newPost.content])

    const deletePreviewImageHandler = (image: any) => {
        setSelectedImages(selectedImages.filter((e: any) => e !== image));
        URL.revokeObjectURL(image);
        if (!image.startsWith('blob:')) {
            dispatch(deletePostImage(image));
        }

    }

    const showEmojiPicker = () => {
        setOpenEmojiPicker(true)
    }

    const handleCreatePost = async () => {
        try {
            setLoading(!loading)
            if (selectedImagesUpload.length !== 0) {
                console.log('post update', selectedImagesUpload);
                const checkImage = selectedImagesUpload.filter((item: any) => item instanceof File);

                const uploadPromises = await checkImage.map(async (image: any) => {
                    const imgRef = ref(imageDb, `files/sn_${uuid()}`)
                    const uploaded = await uploadBytes(imgRef, image)
                    return getDownloadURL(uploaded.ref);
                })
                let postPayloadData: any
                let downloadUrl: any = []
                downloadUrl = await (Promise.all(uploadPromises))
                setNewPost((prevState) => {
                    postPayloadData = { ...prevState, image: downloadUrl };
                    dispatch(updatePost(postPayloadData))
                    return postPayloadData;
                })
                setLoading(false)
                closeModal()

            } else {
                dispatch(updatePost({ ...newPost })).then((res) => res.payload).then((data) => {
                    if (data) {
                        setLoading(false)
                        closeModal()
                    }
                })
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
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
                        Edit Post
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

                    </div>

                    <div className="post-intput-container">
                        <textarea placeholder="Whant's on your mind, John?" value={newPost.content} onChange={(e) => {
                            setNewPost({ ...newPost, 'content': e.target.value })
                        }} className='textareaBox'>
                        </textarea>

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
                        <Box>
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
                        </Box>
                    </div>

                    <button
                        className={postBtnDisable ? 'sharedPostBtn' : 'sharedPostBtnDisable'}
                        value='Update Now'
                        onClick={handleCreatePost}
                    >
                        {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Update'}
                    </button>
                </div>

            </Box>

        </Modal>
    );
}

export default PostEdit