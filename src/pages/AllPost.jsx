import React, { useEffect } from 'react'
import appWriteSevice from '../appwrite/config'
import { Container, PostCard } from '../components/index'

function AllPost() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const postList = appWriteSevice?.getAllPostList([]).then((data) => data ? setPosts(data.documents) : null).catch((error) => console.log(error.message))
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts?.map((post) => (
                        <div key={post?.$id} className='p-2 w-1/4'>
                            <PostCard {...post}></PostCard>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost