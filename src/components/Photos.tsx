import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './style/photos.css'
import { useAppDispatch } from '../store/hooks';
import { fetchPhotos } from '../store/slices/appSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from '@mui/material/Skeleton';
import PostPhotoDialog from './PostPhotoDialog';
import { useNavigate } from 'react-router-dom';

interface Image {
    id: number
    post_id: number | null
    url: string
}

const Photos = () => {
    const dispatch = useAppDispatch()
    const [itemData, setItemData] = useState<Image[]>([])
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true)
    const [open, setOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState<number>(0)
    const navigate = useNavigate()

    const fetchData = () => {
        dispatch(fetchPhotos(page)).then((res) => res.payload).then((data) => {
            if (data) {
                console.log('photos', data);
                return setItemData([...itemData, ...data])

            }
            return setHasMore(false);
        })
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleLoaded: React.ReactEventHandler<HTMLImageElement> = () => {
        setLoading(false)
    }

    const handleOpenPhoto = (index: number) => {
        setPhotoIndex(index)
        setOpen(true)
    }

    const handleLinkToPost = (id: number | null) => {
        navigate(`/post/${id}`)
    }
    return (
        <Box className='container' id='containerBoxDiv'>
            <InfiniteScroll
                dataLength={itemData.length}
                next={fetchData}
                hasMore={hasMore}
                loader=''
                endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                scrollableTarget="containerBoxDiv"
            >
                <ImageList variant="masonry" cols={3} gap={8}>

                    {itemData && itemData.map((item, index) => (
                        <ImageListItem key={item.id} className='photoContainer'>
                            {loading && <Skeleton variant="rectangular" width={210} height={118} />}

                            <img
                                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.url}&w=248&fit=crop&auto=format`}
                                alt=''
                                loading="lazy"
                                onLoad={handleLoaded}
                                onClick={() => handleOpenPhoto(index)}

                            />
                            <span className='viewPostBtn' onClick={() => handleLinkToPost(item.post_id)}>view post</span>

                        </ImageListItem>
                    ))}
                </ImageList>
            </InfiniteScroll>

            <PostPhotoDialog
                open={open}
                setOpen={setOpen}
                photo={itemData}
                photoIndex={photoIndex}
            />

        </Box>
    );
}

export default Photos
