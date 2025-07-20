import { useEffect, useRef } from "react";
import Tiptap from "../components/Tiptap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Authenticated, do nothing
      })
      .catch((error) => {
        // Unauthorized/expired
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token"); //getting the token from the local storage
    console.log("stored token: ", token);
    const title = e.target.postTitle.value;
    const postContent = editorRef.current?.getHTML() || "";
    const blogPost = {
      title: title,
      post_Content: postContent,
    };
    axios.post("http://localhost:5000/api/newpost", blogPost, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return (
    <div className="dark:text-white flex justify-center mt-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:w-2xl border border-gray-200 shadow-md rounded-md"
      >
        <label className="pt-2 pb-2 mx-4">Title</label>
        <input
          className="p-1 mx-4 focus:outline-none"
          type="text"
          name="postTitle"
          placeholder="Title your post..."
        />
        <Tiptap
          onEditorContentPost={(contentData) =>
            (editorRef.current = contentData)
          }
        />
        <button
          type="submit"
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white w-20 p-1 rounded-md mt-2 ml-2 mb-2"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;
