import * as React from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { Box } from '@mui/material';

import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { InputChange } from './CreateAboutUsDialog';

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
interface AboutUsInputGroupProps {
    handleInputChange: ({ index, event }: InputChange) => void;
    inputValue: {
        textValue: string;
        selectValue: number;
    };
    indexValue: number;
}

const AboutUsInputGroup = ({ handleInputChange, indexValue, inputValue }: AboutUsInputGroupProps) => {

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 1, height: 20, width: '12%' }} variant="standard">
                <Select
                    name="selectValue"
                    id="demo-customized-select"
                    value={inputValue.selectValue}
                    onChange={(e) => handleInputChange({ index: indexValue, event: e })}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={0}><em>None</em></MenuItem>
                    {iconList.map((list) => (<MenuItem key={list.id} value={list.id}>{list.icon}</MenuItem>))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: '80%' }} variant="standard" fullWidth>
                <BootstrapInput id="demo-customized-textbox"
                    name="textValue"
                    value={inputValue.textValue}
                    onChange={(e) => handleInputChange({ index: indexValue, event: e })}
                />
            </FormControl>
        </Box>
    );
}

export default AboutUsInputGroup;