import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostView = ({ containerBoxDiv }: any) => {
    const [items, setItems] = useState<any>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        console.log('post loaded');

        try {
            const response = await fetch(`http://localhost:8000/api/post?page=${page}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }
            })
            const dataFromServer = await response.json()
            const { data } = dataFromServer
            console.log('post view', data);

            setItems((prevItems: any) => [...prevItems, ...data]);
            setPage((prevPage) => prevPage + 1);

            if (data.length == 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
            scrollableTarget={containerBoxDiv}
        >
            <></>
        </InfiniteScroll>
    );
};

export default PostView;
