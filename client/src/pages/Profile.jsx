import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 200) {
        const data = res.data.profileData;
        if (data.length > 0) {
          const { name, surname } = data[0];
          setProfile({ name, surname });
          setPosts(data.map(post => ({
            id: post.post_id,
            title: post.title,
            created_at: post.created_at
          })));
        } else {
          setProfile(null);
          setPosts([]);
        }
      }
    })
    .catch(err => {
      console.error("Error fetching profile:", err);
      setProfile(null);
      setPosts([]);
    });
  }, [id]);

  return (
    <div className="dark:text-white px-4 sm:px-10">
      {/* Cover section */}
      <div className="h-60 border border-gray-300 flex items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          {profile ? `${profile.name} ${profile.surname}` : "User not found"}
        </h2>
      </div>

      {/* Bio and followers */}
      <div className="flex flex-col gap-2 mt-4 pb-4 border-b border-b-gray-300 text-center sm:text-left">
        <p className="text-base sm:text-lg">Bio: "Hello there! How you doing?"</p>
        <div className="text-sm sm:text-base">Followers: 12.5K</div>
        <div className="flex justify-center sm:justify-start">
          <button className="bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white rounded-md text-sm sm:text-base">
            Follow
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="mt-6 max-w-4xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-gray-400 text-center mt-4">
            This user hasn’t posted anything yet.
          </div>
        ) : (
          posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="mb-6 border border-gray-300 p-4 rounded-md hover:shadow-md transition">
                <div className="text-lg sm:text-xl font-semibold mb-1">{post.title}</div>
                <div className="text-gray-500 text-sm">
                  Posted on {new Date(post.created_at).toLocaleString()}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
