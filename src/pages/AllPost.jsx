import React, { useEffect, useState } from 'react'
import appWriteSevice from '../appwrite/config'
import { Container, PostCard } from '../components/index'

function AllPost() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appWriteSevice?.getAllPostList([]).then((data) =>{
            if(data){
                setPosts(data.documents)
            }
        })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts?.length ? (posts?.map((post) => (
                        <div key={post?.$id} className='p-2 w-1/4'>
                            <PostCard {...post}></PostCard>
                        </div>
                    ))) : <div>No Post Created</div>}
                </div>
            </Container>
        </div>
    )
}

export default AllPost