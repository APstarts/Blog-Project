import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import Navbar from "../components/Navbar";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [formatDate, setFormatDate] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5000/api/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPost(res.data);
        handleDate(res.data.created_at);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  function handleDate(date) {
    const utcDate = new Date(date);
    setFormatDate(utcDate);
  }

  return (
    <>
      <Navbar />
      <div className="dark:text-white px-4 sm:px-10 md:px-20 lg:px-40 xl:px-80 mt-6">
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold">{post.title}</h1>

          <div className="text-gray-400 text-sm sm:text-base flex flex-col sm:flex-row justify-between gap-1 sm:items-center">
            <Link to={`/profile/${post.user_id}`} className="hover:underline">
              By {post.name} {post.surname}
            </Link>
            <div>{formatDate?.toLocaleString()}</div>
          </div>

          <div className="prose dark:prose-invert max-w-full">
            {parse(post.content)}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
