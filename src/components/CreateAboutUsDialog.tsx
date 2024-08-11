import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AboutUsInputGroup from './AboutUsInputGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import './style/aboutUs.css'

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

const CreateAboutUsDialog = ({ open, setOpen }: Props) => {

    const closeModal = () => {
        setOpen(false)
    }

    const [inputFields, setInputFields] = useState([{ value: '' }]);

    const handleAddField = () => {
        setInputFields([...inputFields, { value: '' }]);
    };

    const handleInputChange = ({ index, event }: any) => {
        const newInputFields = [...inputFields];
        newInputFields[index].value = event.target.value;
        setInputFields(newInputFields);
    };

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
                        <Box key={index}>
                            {/* <input
                                type="text"
                                value={input.value}
                                onChange={(event) => handleInputChange({ index, event })}
                                placeholder={`Input Field ${index + 1}`}
                            /> */}
                            <AboutUsInputGroup />
                        </Box>
                    ))}
                    <Button variant='outlined' onClick={handleAddField}>Add More</Button>
                </Box>
                <Box sx={{ position: 'absolute', right: 3, bottom: 10 }}>
                    <Button variant='contained' onClick={handleAddField} sx={{ marginRight: 3, bgcolor: 'gray' }}>cancel</Button>
                    <Button variant='contained' onClick={handleAddField}>Save</Button>
                </Box>
            </Box>

        </Modal>
    )
}

export default CreateAboutUsDialog