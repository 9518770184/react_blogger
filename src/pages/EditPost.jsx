import React, { useEffect, useState } from 'react'
import  { Container, PostForm } from '../components/index'
import appWriteservice from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';


function EditPost() {

    const [post, setPost] = useState(null);
    const {slug} =  useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appWriteservice?.getPost(slug).then((data)=> setPost(data)).catch((error)=> console.log(error.message))
        }else{
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <Container>
        <PostForm post={post} />
    </Container>
    ) : null
}

export default EditPost