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
        <form onSubmit={handleSubmit} className='flex flex-col md:w-2xl border border-gray-200'>
            <label>Title</label>
            <input className='p-1 border border-gray-200' type="text" name="postTitle" />
            <label className='pl-7 pt-5 md:text-2xl'>What's on your mind?</label>
            <Tiptap onEditorContentPost={(contentData) => editorRef.current = contentData} />
            <button type="submit" className='bg-blue-500 text-white w-max p-1 rounded-md ml-2 mb-2'>Post</button>
        </form>
    </div>
  )
}

export default NewPost