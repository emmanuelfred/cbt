import React, { useEffect, useState } from "react";
import { useBlogStore } from "../Store/BlogStore";

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const { blogs, fetchBlogs, loading, error } = useBlogStore();

  // 1️⃣ Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // 2️⃣ Update posts when blogs change
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setPosts(blogs.slice(0, 3));
    }
  }, [blogs]);

  // ✂️ Shorten long content
  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <section id="blog" className="py-16 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#014925] mb-12">
          <span className="text-[#0C6F89]">Latest</span> Blog Posts
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-[#014925] mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {truncate(post.content, 120)}
                </p>
                <a
                  href={`/blog/${post._id}`}
                  className="text-[#014925] font-medium hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-10">
          <a
            href="/blogs"
            className="inline-block bg-[#0C6F89] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#026d36] transition duration-300"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
