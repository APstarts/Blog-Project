import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import parse from 'html-react-parser';

function Feed() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fromLocalStorage = localStorage.getItem("blogPost");

    if (fromLocalStorage) {
      try {
        const parsed = JSON.parse(fromLocalStorage);
        setContent(parsed);
      } catch (err) {
        console.error("Failed to parse blogPost from localStorage:", err);
        setContent(null);
      }
    }
  }, []);

  // Return early if content is not yet loaded
  if (!content) {
    return (
      <div className="dark:text-white">
        <Navbar />
        <div className="p-4 text-gray-400">No post found.</div>
      </div>
    );
  }

  return (
    <div className="dark:text-white">
      <Navbar />
      <div className="feed-container p-4 md:px-52">
        <div className="post-container border border-gray-200 p-4 rounded-lg shadow">
          <div className="title-container text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
            {content.Title}
          </div>
          <div className="post-content prose dark:prose-invert max-w-none">
            {parse(content.Post_Content || '')}
          </div>
          <div className='flex gap-2 mt-2 border-t border-gray-200 p-2'>
            <button type="button" className='bg-blue-500 cursor-pointer hover:bg-blue-600 p-2 text-xs text-white rounded-md'>Like</button>
            <button type="button" className='bg-blue-500 cursor-pointer hover:bg-blue-600 p-2 text-xs text-white rounded-md'>Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
