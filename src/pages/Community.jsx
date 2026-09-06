import React, { useState, useEffect } from "react";
import { fetchPosts } from "../services/nexus";

const Community = () => {
  // STATE INITIALIZATION
  // 'posts' holds our data. 'setPosts' is the function to update it.
  // We start with an empty array [] because there are no posts initially.
  const [posts, setPosts] = useState([]);

  // 'loading' tracks if the network request is still running.
  const [loading, setLoading] = useState(true);

  // THE SIDE EFFECT Data Fetching
  useEffect(() => {
    const loadCommunityPosts = async () => {
      try {
        // Call our service layer which talks to localhost:3000/posts
        const data = await fetchPosts();

        // Save the fetched data into React's memory
        setPosts(data);

        console.log("Fullstack Pipeline Success! Data from MongoDB:", data);
      } catch (error) {
        console.error("Pipeline failed:", error);
      } finally {
        //stop the loading state
        setLoading(false);
      }
    };

    // Execute the inner function
    loadCommunityPosts();
  }, []); // The crucial dependency array. Only run once on mount.

  // THE UI RENDER
  return (
    <div className="min-h-screen pt-24 px-8 text-white relative z-10">
      <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        Nexus Community
      </h2>

      {/* Conditional Rendering: Show loading text if waiting, otherwise show data */}
      {loading ? (
        <p className="text-gray-400 animate-pulse">
          Establishing secure connection to backend...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* .map() loops through our MongoDB array and creates a card for each document */}
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-emerald-300 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-300 mb-4">{post.content}</p>
              <span className="text-xs text-gray-500 uppercase tracking-wider">
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
