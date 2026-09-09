import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, deletePost } from "../services/nexus";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: "6a9790225f24aa47884a56ca",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // New State for Custom Delete Modal
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const loadCommunityPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Pipeline failed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCommunityPosts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Inline Error State
        setErrorMsg(
          "File size exceeds 5MB limit. Please choose a smaller image.",
        );
        e.target.value = "";
        setImageFile(null);

        // Auto-clear the error after 5 seconds
        setTimeout(() => setErrorMsg(null), 5000);
        return;
      }
      setImageFile(file);
      setErrorMsg(null); // Clear any existing errors if a valid file is chosen
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("content", formData.content);
      payload.append("authorId", formData.authorId);

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const newPost = await createPost(payload);
      setPosts([newPost, ...posts]);

      setFormData({
        title: "",
        content: "",
        authorId: "6a9790225f24aa47884a56ca",
      });
      setImageFile(null);
      document.getElementById("image-upload").value = "";
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // New Modal Handlers instead of window.confirm()
  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete);
      setPosts(posts.filter((post) => post._id !== postToDelete));
    } catch (error) {
      console.error("Failed to delete post:", error);
      setErrorMsg("Could not delete the post. Please try again.");
      setTimeout(() => setErrorMsg(null), 5000);
    } finally {
      setPostToDelete(null); // Close the modal
    }
  };

  return (
    <div className="min-h-screen pt-12 px-4 sm:px-8 text-white relative z-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        Nexus Community
      </h2>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl mb-10 max-w-2xl">
        <h3 className="text-xl font-semibold mb-4 text-emerald-300">
          Share your thoughts
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Post Title..."
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
          <div>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your review or discussion here..."
              required
              rows="3"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-400 transition-colors resize-none"
            ></textarea>
          </div>

          <div>
            {/* Explicit 5MB Label limit */}
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Optional Thumbnail{" "}
              <span className="text-emerald-400">(Max 5MB)</span>
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-emerald-500/20 file:text-emerald-300
                                hover:file:bg-emerald-500/30 transition-all cursor-pointer"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-bold transition-all ${
              isSubmitting
                ? "bg-emerald-600/50 text-white/50 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-gray-900 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            }`}
          >
            {isSubmitting ? "Publishing Post..." : "Post to Community"}
          </button>
        </form>
      </div>

      {loading ? (
        <p className="text-gray-400 animate-pulse">
          Establishing secure connection to backend...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Changed onClick to open our Custom Modal */}
              <button
                onClick={() => setPostToDelete(post._id)}
                className="absolute top-4 right-4 text-white hover:text-red-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20 drop-shadow-md bg-black/50 p-2 rounded-full"
                title="Delete Post"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>

              {post.imageUrl && (
                <div className="w-full h-48 sm:h-64 overflow-hidden bg-black/40 flex items-center justify-center">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-300 mb-2 pr-8">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <span className="text-xs text-gray-500 uppercase tracking-wider block border-t border-white/10 pt-4 mt-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-gray-400">
              No posts found in MongoDB. Database is empty.
            </p>
          )}
        </div>
      )}

      {/* The Custom Tailwind Modal Overlay */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-gray-900 border border-white/10 p-6 rounded-xl w-full max-w-sm shadow-2xl transform transition-all">
            <h3 className="text-xl font-bold text-white mb-2">Delete Post?</h3>
            <p className="text-gray-400 mb-6 text-sm">
              This action cannot be undone. Are you sure you want to permanently
              remove this post?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
