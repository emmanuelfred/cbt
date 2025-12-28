// src/pages/BlogPage.jsx - USER SIDE UPDATED
import React, { useEffect, useState } from "react";
import { useBlogStore } from "../Store/BlogStore";
import { useNavigate } from "react-router-dom";
import { FaEye, FaHeart, FaComment, FaClock, FaFilter } from 'react-icons/fa';

const BlogPage = () => {
  const navigate = useNavigate();
  const { blogs, fetchBlogs, loading, error } = useBlogStore();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchBlogs({ category: selectedCategory });
  }, [selectedCategory]);

  // Get unique categories
  const categories = [...new Set(blogs.map(blog => blog.category))];

  // Strip HTML tags for preview
  const stripHTML = (html) => {
    if (!html) return "";
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Truncate text
  const truncate = (text, maxLength) => {
    if (!text) return "";
    const stripped = stripHTML(text);
    return stripped.length > maxLength ? stripped.substring(0, maxLength) + "..." : stripped;
  };

  return (
    <section id="blog" className="py-16 text-center" style={{ paddingTop: '100px' }}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#014925] mb-4">
            <span className="text-[#0C6F89]">Latest</span> Blog Posts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest insights, tutorials, and updates
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full transition ${
                !selectedCategory
                  ? 'bg-[#0C6F89] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaFilter className="inline mr-1" />
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category
                    ? 'bg-[#0C6F89] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="spinner-border text-[#0C6F89]" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-gray-500 ml-3">Loading blogs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs && blogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/blog/${post._id}`)}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={post.image || '/placeholder-blog.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#0C6F89] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  {/* Date Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-left">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#014925] mb-2 group-hover:text-[#0C6F89] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt/Content Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt || truncate(post.content, 120)}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1" title="Views">
                        <FaEye className="text-[#0C6F89]" />
                        {post.views || 0}
                      </span>
                      <span className="flex items-center gap-1" title="Comments">
                        <FaComment className="text-[#0C6F89]" />
                        {post.commentsCount || 0}
                      </span>
                      <span className="flex items-center gap-1" title="Likes">
                        <FaHeart className="text-[#0C6F89]" />
                        {post.likes?.length || 0}
                      </span>
                    </div>
                    <span className="flex items-center gap-1" title="Reading time">
                      <FaClock className="text-[#0C6F89]" />
                      5 min
                    </span>
                  </div>

                  {/* Author */}
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500">
                      By <span className="text-[#014925] font-medium">{post.authorName || post.author}</span>
                    </p>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blog/${post._id}`);
                    }}
                    className="mt-4 w-full text-[#0C6F89] font-medium hover:text-white hover:bg-[#0C6F89] border-2 border-[#0C6F89] py-2 rounded-lg transition-all duration-300"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No blogs found</h3>
            <p className="text-gray-500">
              {selectedCategory
                ? `No blogs in "${selectedCategory}" category yet.`
                : 'Check back soon for new content!'}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogPage;