import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, deletePost } from "../services/nexus";

const Community = () => {
  // Existing States
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // New States for the Form
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: "6a9790225f24aa47884a56ca",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Initial Fetch
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

  // Form Input Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents browser refresh
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // Send payload to Express
      const newPost = await createPost(formData);

      // Inject new post at the top of the UI locally without refreshing
      setPosts([newPost, ...posts]);

      // Clear the form fields
      setFormData({
        title: "",
        content: "",
        authorId: "6a9790225f24aa47884a56ca",
      });
    } catch (error) {
      // Axios places backend error responses inside error.response
      setErrorMsg(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to create post. Ensure authorId is a valid MongoDB User ID.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler
  const handleDelete = async (postId) => {
    // Confirmation dialog so users don't delete accidentally
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      // Tell backend to delete from MongoDB
      await deletePost(postId);

      // Filter out the deleted post from the screen
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Could not delete the post. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen pt-12 px-4 sm:px-8 text-white relative z-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        Nexus Community
      </h2>

      {/* The Create Post Form */}
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

          {/* Error Boundary Display */}
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
            {isSubmitting ? "Injecting into Database..." : "Post to Community"}
          </button>
        </form>
      </div>

      {/* The Existing Grid UI */}
      {loading ? (
        <p className="text-gray-400 animate-pulse">
          Establishing secure connection to backend...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col justify-between group relative"
            >
              {/* Delete Button (Visible on hover in Desktop) */}
              <button
                onClick={() => handleDelete(post._id)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                title="Delete Post"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>

              <div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-2 pr-8">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4">{post.content}</p>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider mt-4 block">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-gray-400">
              No posts found in MongoDB. Database is empty.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Community;
