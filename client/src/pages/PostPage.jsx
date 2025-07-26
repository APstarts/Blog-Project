import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';

function PostPage() {
    const {id} = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(`http://localhost:5000/api/post/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            console.log(res);
            setPost(res.data);
        })
        .catch(err => console.log(err))
    },[id])

    
    if(!post) return <div>Loading...</div>;
    let utcString = new Date(post.created_at);
    const localeDate = new Date(utcString);
    console.log(localeDate);
  return (
    <div className='dark:text-white px-5'>
        <div>
                <div>
                    <div>{post.title}</div>
                    <div className='text-gray-300'>By {post.name} {post.surname} {post.created_at}</div>
                    <div>{parse(post.content)}</div>
                </div>
        </div>
    </div>
  )
}

export default PostPage