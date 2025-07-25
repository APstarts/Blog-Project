import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import parse from 'html-react-parser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Feed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:5000/api/feed", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          const posts = res.data.contents;
          if (posts && posts.length > 0) {
            setContent(posts[0]); // default to showing first post when page loads
          }
        }
      })
      .catch(error => {
        console.log("Feed page error: ", error);
        navigate("/");
      });
  }, []);

  const handleSearch = () => {
    const token = localStorage.getItem("token");
    if (!searchQuery.trim()) return;

    axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(searchQuery)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setSearchResults(res.data);
      })
      .catch(err => {
        console.error("Search error:", err);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="dark:text-white">
      <Navbar />

      {/* Search bar */}
      <div className="search-box p-4 md:px-52 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="search-results p-4 md:px-52 space-y-4">
          {searchResults.length > 0 ? (
            searchResults.map(post => (
              <Link to={`/post/${post.id}`}>
                <div className="post-container border border-gray-200 p-4 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition">
                  <div className="text-2xl font-bold mb-2">{post.title}</div>
                  <div className="text-sm text-gray-400 mb-2">by {post.name} {post.surname}</div>
                  <div className="prose dark:prose-invert max-w-none">
                    {parse(post.content || '')}
                  </div>
                </div>
              </Link>

            ))
          ) : (
            <div className="text-gray-400">No matching posts.</div>
          )}
        </div>
      )}

      {/* Fallback: default feed post if no search is active */}
      {!searchQuery && content && (
        <div className="feed-container p-4 md:px-52">
          <div className="post-container border border-gray-200 p-4 rounded-lg shadow">
            <div className="title-container text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
              {content.title}
            </div>
            <div className="post-content prose dark:prose-invert max-w-none">
              {parse(content.content || '')}
            </div>
            <div className='flex gap-2 mt-2 border-t border-gray-200 p-2'>
              <button type="button" className='bg-blue-500 cursor-pointer hover:bg-blue-600 p-2 text-xs text-white rounded-md'>Like</button>
              <button type="button" className='bg-blue-500 cursor-pointer hover:bg-blue-600 p-2 text-xs text-white rounded-md'>Comment</button>
            </div>
          </div>
        </div>
      )}

      {/* If content and searchResults are both empty */}
      {!searchQuery && !content && (
        <div className="p-4 text-gray-400 md:px-52">No post found.</div>
      )}
    </div>
  );
}

export default Feed;
