import { Box, Card, Typography } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import "./style/content.css"
import React from 'react'

const Content = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    return (
        <Box className='containerBox'>
            <Box className='storySection'>
                <Typography className='storyHeader'>Stories</Typography>
                <Box className='storyBox'>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2ZfH1x24-7Nagdv4N9kOX6bDzqJ_nFu2Tg&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2ZfH1x24-7Nagdv4N9kOX6bDzqJ_nFu2Tg&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2ZfH1x24-7Nagdv4N9kOX6bDzqJ_nFu2Tg&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    <Card className='story'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyData' />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ_pFEuyzQacYLhz6ymV8Nxq-3hyIa-1Y1A&s" alt="story" className='storyProfile' />
                    </Card>
                    {/* <Box className='storyPaginate'><ArrowForwardIosRoundedIcon /></Box> */}
                </Box>
            </Box>
            <Box className='postSection'>

            </Box>
        </Box>
    )
}

export default Content