import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { Box } from '@mui/material';

import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    '.MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const iconList = [
    { id: 1, icon: <WorkRoundedIcon /> },
    { id: 2, icon: <HomeRoundedIcon /> },
]

const AboutUsInputGroup = () => {
    const [age, setAge] = React.useState('');
    const handleChange = (event: { target: { value: string } }) => {
        setAge(event.target.value);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 1, height: 20, width: '12%' }} variant="standard">
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={age}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={0}><em>None</em></MenuItem>
                    {iconList.map((list) => (<MenuItem value={list.id}>{list.icon}</MenuItem>))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: '80%' }} variant="standard" fullWidth>
                <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
        </Box>
    );
}

export default AboutUsInputGroup;