import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, IconButton, Modal, TextField, Typography, CircularProgress } from '@mui/material'
import { ProfileDataDetail } from '../types/profileData'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { imageDb } from '../config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from '../store/hooks';
import { updateProfile } from '../store/slices/profileDataSlice';

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    profileData: ProfileDataDetail | null
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

const UpdateProfile = ({ open, setOpen, profileData }: Props) => {
    const [selectedImage, setSelectedImage] = useState<any>()
    const [selectedImageUpload, setSelectedImageUpload] = useState<any>()
    const [updateName, setUpdateName] = useState<string>()
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setUpdateName(profileData?.name)
    }, [profileData])

    const closeModal = () => {
        setOpen(false)
    }

    const onSelectFile = (event: any) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile);
        const imagesArray = URL.createObjectURL(selectedFile);
        setSelectedImage(imagesArray);
        setSelectedImageUpload(selectedFile)
        event.target.value = "";
    };

    const handleUpdate = async () => {
        setLoading(!loading)
        let newProfile: string
        try {

            if (updateName != profileData?.name || selectedImageUpload) {
                if (selectedImageUpload) {
                    const imgRef = ref(imageDb, `files/sn_${uuid()}`)
                    const uploaded = await uploadBytes(imgRef, selectedImageUpload)
                    newProfile = await getDownloadURL(uploaded.ref);
                    console.log('newProfile', newProfile);
                    dispatch(updateProfile({
                        'name': updateName,
                        'profile': newProfile
                    })).then((res) => res.payload).then((data) => {
                        if (data) {
                            setLoading(!loading)
                            closeModal()
                        }
                    })

                } else {
                    dispatch(updateProfile({ 'name': updateName, 'profile': '' }))
                }
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
            <Box sx={style} >
                <Box className='createPostHeader'>
                    <Typography sx={{ color: '#626262', fontWeight: 'bold', marginTop: 1 }}>
                        Update Profile
                    </Typography>
                    <IconButton sx={{ position: 'absolute', right: 0 }}
                        onClick={closeModal}
                    >
                        <CloseRoundedIcon />
                    </IconButton>

                </Box>
                <Box>
                    <Box className='updateProfileBox'>
                        <Box>
                            <Box className=''>
                                <Avatar alt={profileData?.name} src={selectedImage ? selectedImage : profileData?.profile} sx={{ width: '15rem', height: '15rem' }} />
                                <Box component='label' className='avatarBox' htmlFor="formId" onChange={onSelectFile}>
                                    <AddCircleRoundedIcon className='avatarUpload' sx={{ fontSize: 40 }} />
                                    <input
                                        type='file'
                                        id="formId"
                                        accept="image/png , image/jpeg, image/webp"
                                        hidden
                                    />
                                </Box>
                            </Box>
                            <Box className='updateProfileAction'>
                                <TextField value={updateName} className='nameEdit' onChange={(e) => setUpdateName(e.target.value)} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ margin: 3, float: 'right' }}>
                        <Button variant='contained' sx={{ height: 30, bgcolor: 'gray' }} onClick={closeModal}>Cancel</Button>
                        <Button variant='contained' sx={{ height: 30, marginLeft: 3 }} onClick={handleUpdate}>
                            {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Update'}
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Modal>
    )
}

export default UpdateProfile