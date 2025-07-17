import {useRef} from 'react';
import Tiptap from '../components/Tiptap';

function NewPost() {
    const editorRef = useRef(null);
    
    function handleSubmit(e){
        e.preventDefault();
        const title = e.target.postTitle.value;
        const postContent = editorRef.current?.getHTML() || "";
        const blogPost = {
            Title: title,
            Post_Content: postContent
        }
        console.log("blog post: ", blogPost);
        localStorage.setItem("blogPost", JSON.stringify(blogPost));
    }
  return (
    <div className='dark:text-white flex justify-center mt-50'>
        <form onSubmit={handleSubmit} className='flex flex-col md:w-2xl border border-gray-200 shadow-md rounded-md'>
            <label className='pt-2 pb-2 mx-4'>Title</label>
            <input className='p-1 mx-4 focus:outline-none' type="text" name="postTitle" placeholder='Title your post...'/>
            <Tiptap onEditorContentPost={(contentData) => editorRef.current = contentData} />
            <button type="submit" className='bg-blue-500 cursor-pointer hover:bg-blue-600 text-white w-20 p-1 rounded-md mt-2 ml-2 mb-2'>Post</button>
        </form>
    </div>
  )
}

export default NewPost