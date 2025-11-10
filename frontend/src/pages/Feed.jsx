import React, { useEffect, useState } from "react";
import API from "../api/api";
import Topbar from "../components/Topbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import toast, { Toaster } from "react-hot-toast";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      toast.error("Could not fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />
      <Topbar />
      <div className="max-w-2xl mx-auto pt-20 space-y-4 px-3">
        <CreatePost onPost={fetchPosts} />
        {loading ? (
          <div className="text-center text-gray-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">No posts yet 😅</div>
        ) : (
          posts.map((p) => <PostCard key={p._id} post={p} />)
        )}
      </div>
    </div>
  );
}
