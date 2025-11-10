import React, { useState, useEffect } from "react";
import API from "../api/api";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

export default function PostCard({ post }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [liked, setLiked] = useState(post.likes?.includes(user._id));
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments for this post
  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${post._id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Like / Unlike a post
  const toggleLike = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await API.post(`/posts/${post._id}/like`);
      setLiked(res.data.liked);
      setLikeCount(res.data.likes);
    } catch (err) {
      toast.error("Failed to like post");
    } finally {
      setLoading(false);
    }
  };

  // Add comment
  const addComment = async () => {
    if (!text.trim()) return;
    try {
      const res = await API.post(`/comments/${post._id}`, { text });
      setComments([res.data, ...comments]);
      setText("");
    } catch (err) {
      toast.error("Failed to comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white p-4 rounded-lg shadow-sm"
    >
      {/* Post Header */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
          {post.userId?.name?.[0] || "U"}
        </div>
        <div>
          <div className="font-semibold text-gray-800">
            {post.userId?.name || "User"}
          </div>
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-800">{post.text}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="mt-3 rounded-lg max-h-96 w-full object-cover"
        />
      )}

      {/* Like Section */}
      <div className="flex items-center mt-3 space-x-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleLike}
          disabled={loading}
          className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 border transition ${
            liked
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          <span>{liked ? "💙" : "🤍"}</span>
          <span>{liked ? "Liked" : "Like"}</span>
        </motion.button>

        <span className="text-sm text-gray-500">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Comments */}
      <div className="mt-4">
        {/* Add Comment Input */}
        <div className="flex space-x-2">
          <input
            className="flex-1 border rounded-md px-2 py-1 text-sm focus:ring focus:ring-blue-200"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={addComment}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>

        {/* Comment List */}
        <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet</p>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="border-t pt-1 text-sm text-gray-700 break-words"
              >
                <span className="font-medium text-gray-800">
                  {c.userId?.name}:
                </span>{" "}
                {c.text}
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
