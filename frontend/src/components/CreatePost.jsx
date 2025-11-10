import React, { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function CreatePost({ onPost }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!text.trim() && !image) return toast.error("Post cannot be empty!");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);

      await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setText("");
      setImage(null);
      toast.success("Posted!");
      onPost();
    } catch (err) {
      toast.error("Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
        rows="3"
        placeholder="Share your thoughts..."
      />
      <input
        type="file"
        accept="image/*"
        className="mt-2 text-sm"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handlePost}
          disabled={loading}
          className={`${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded-full transition`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
