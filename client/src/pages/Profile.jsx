import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:5000/api/feed", {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            if(res.status === 200){
                const result = res.data.contents;
                setContent(result);
            }
        })
        .catch(err => console.log(err))
    },[])
  return (
    <div className='dark:text-white'>
        <div className='h-60 border border-gray-300'>

        </div>
        <div>
            <div className='px-10 flex flex-col gap-2 mt-2'>
                <p>Bio: 'Hello there! How you doing?'</p>
                <div>
                    followers:
                </div>
            </div>
        </div>
        {/* Posts */}
        <div className='mx-52 p-2'>
        {content.map((item)=> (
            <ul>
                <li className='border border-gray-200 my-3 p-2 font-bold rounded-md' key={item.id}>
                    <h2>{item.title}</h2>
                    </li>
            </ul>
        ))}

        </div>
    </div>
  )
}

export default Profile;