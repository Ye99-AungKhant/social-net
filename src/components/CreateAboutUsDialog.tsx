import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import React, { useState, ChangeEvent } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AboutUsInputGroup from './AboutUsInputGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { SelectChangeEvent } from '@mui/material/Select';
import './style/aboutUs.css'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useAppDispatch } from '../store/hooks';
import { createAboutus } from '../store/slices/profileDataSlice';


const iconList = [
    { id: 1, icon: <WorkRoundedIcon /> },
    { id: 2, icon: <HomeRoundedIcon /> },
]

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
}
export interface InputChange {
    index: number
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<number>
}

export interface InputFields {
    textValue: string
    selectValue: number
}

const CreateAboutUsDialog = ({ open, setOpen }: Props) => {
    const dispatch = useAppDispatch()

    const closeModal = () => {
        setOpen(false)
        setInputFields([{ textValue: '', selectValue: 0 }])
    }

    const [inputFields, setInputFields] = useState<InputFields[]>([{ textValue: '', selectValue: 0 }]);

    const handleAddField = () => {
        setInputFields([...inputFields, { textValue: '', selectValue: 0 }]);
    };

    const handleInputChange = ({ index, event }: InputChange) => {
        const { name, value } = event.target;

        setInputFields((prevFields) => {
            const newFields = [...prevFields];
            newFields[index] = {
                ...newFields[index],
                [name]: value,
            };
            return newFields;
        });
    };

    const handleAboutUsSave = () => {
        dispatch(createAboutus(inputFields))
        closeModal()
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
                        Create About Us
                    </Typography>
                    <IconButton sx={{ position: 'absolute', right: 0 }}
                        onClick={closeModal}
                    >
                        <CloseRoundedIcon />
                    </IconButton>

                </Box>

                <Box className='aboutUsBox'>
                    <Stack direction="row" spacing={3} sx={{ m: 1 }}>
                        <Chip label="Icon" />
                        <Chip label="Content" />
                    </Stack>
                    {inputFields.map((input, index) => (
                        <Box key={index} style={{ marginBottom: '10px' }}>
                            <AboutUsInputGroup
                                indexValue={index}
                                inputValue={input}
                                handleInputChange={handleInputChange}
                            />
                        </Box>
                    ))}
                    <Button variant='outlined' onClick={handleAddField}>Add More</Button>
                </Box>
                <Box sx={{ position: 'absolute', right: 3, bottom: 10 }}>
                    <Button variant='contained' onClick={closeModal} sx={{ marginRight: 3, bgcolor: 'gray' }}>cancel</Button>
                    <Button variant='contained' onClick={handleAboutUsSave}>Save</Button>
                </Box>
            </Box>

        </Modal>
    )
}

export default CreateAboutUsDialog