// src/pages/BlogDetail.jsx - FIXED with useAuthStore
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBlogStore } from "../Store/BlogStore";
import { useAuthStore } from "../Store/authStore"; // Import auth store
import BlogSection from "../Component/BlogSection";
import toast from 'react-hot-toast';
import { FaEye, FaHeart, FaComment, FaShare, FaClock, FaUser, FaReply } from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuthStore(); // Get current user
  
  const { 
    currentBlog, 
    relatedPosts, 
    fetchBlogById, 
    addComment, 
    addReply,
    likeBlog,
    likeComment,
    loading 
  } = useBlogStore();

  // Comment state
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [userName, setUserName] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlogById(id);
    }
    
    // Set user name from auth if logged in
    if (user?.name) {
      setUserName(user.name);
    }
  }, [id, user]);

  // Handle like blog
  const handleLikeBlog = async () => {
    if (!user) {
      toast.error('Please login to like this blog');
      return;
    }

    try {
      const res = await likeBlog(id);
      setLiked(res.isLiked);
      toast.success(res.message);
      fetchBlogById(id);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to like blog');
    }
  };

  // Handle submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (!isAnonymous && !userName.trim()) {
      toast.error('Please enter your name or choose anonymous');
      return;
    }

    setSubmittingComment(true);

    try {
      const commentData = {
        comment: commentText,
        isAnonymous,
        userName: isAnonymous ? 'Anonymous' : userName,
      };

      // Add user ID if logged in and not anonymous
      if (user && !isAnonymous) {
        commentData.userId = user._id;
        commentData.userAvatar = user.profilePic || user.avatar || '';
      }

      await addComment(id, commentData);

      toast.success('✅ Comment added successfully!');
      
      // Reset form
      setCommentText('');
      if (!user) {
        setUserName('');
      }
      setIsAnonymous(false);

      // Refresh blog
      fetchBlogById(id);
    } catch (error) {
      console.error('Comment error:', error);
      toast.error(error.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle submit reply
  const handleSubmitReply = async (commentId) => {
    if (!replyText.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }

    try {
      const replyData = {
        comment: replyText,
        isAnonymous,
        userName: isAnonymous ? 'Anonymous' : (userName || 'Guest'),
      };

      // Add user ID if logged in and not anonymous
      if (user && !isAnonymous) {
        replyData.userId = user._id;
        replyData.userAvatar = user.profilePic || user.avatar || '';
      }

      await addReply(id, commentId, replyData);

      toast.success('✅ Reply added!');
      setReplyingTo(null);
      setReplyText('');
      fetchBlogById(id);
    } catch (error) {
      toast.error('Failed to add reply');
    }
  };

  // Handle like comment
  const handleLikeComment = async (commentId) => {
    if (!user) {
      toast.error('Please login to like comments');
      return;
    }

    try {
      const res = await likeComment(id, commentId);
      toast.success(res.message);
      fetchBlogById(id);
    } catch (error) {
      toast.error('Failed to like comment');
    }
  };

  // Copy link to clipboard
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading && !currentBlog) {
    return (
      <div className="text-center py-20" style={{ paddingTop: '150px' }}>
        <div className="spinner-border text-[#0C6F89]" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="py-20 text-center" style={{ paddingTop: '150px' }}>
        <h2 className="text-2xl text-[#014925] font-semibold mb-4">
          Blog Not Found
        </h2>
        <Link
          to="/blog"
          className="text-[#0C6F89] underline font-medium hover:text-[#014925]"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="py-16 p-2 md:px-6" style={{ paddingTop: '120px' }}>
      <div className="container mx-auto max-w-7xl grid md:grid-cols-3 gap-8">
        {/* Main Blog Content */}
        <div className="md:col-span-2 bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Featured Image */}
          {currentBlog.image && (
            <img
              src={currentBlog.image}
              alt={currentBlog.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-6 md:p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#0C6F89] mb-4">
              {currentBlog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
              <span className="flex items-center gap-1">
                <FaUser className="text-[#0C6F89]" />
                <span className="font-medium text-[#014925]">
                  {currentBlog.authorName || currentBlog.author}
                </span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaClock className="text-[#0C6F89]" />
                {new Date(currentBlog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaEye className="text-[#0C6F89]" />
                {currentBlog.views || 0} views
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaComment className="text-[#0C6F89]" />
                {currentBlog.commentsCount || 0} comments
              </span>
            </div>

            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-[#0C6F89] text-white rounded-full text-sm font-medium">
                {currentBlog.category}
              </span>
              {currentBlog.tags && currentBlog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Excerpt */}
            {currentBlog.excerpt && (
              <div className="bg-blue-50 border-l-4 border-[#0C6F89] p-4 mb-6">
                <p className="text-gray-700 italic">{currentBlog.excerpt}</p>
              </div>
            )}

            {/* Blog Content - Render HTML */}
            <div 
              className="prose prose-lg max-w-none mb-8 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentBlog.content }}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8 pb-8 border-b">
              <button
                onClick={handleLikeBlog}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  liked
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={!user ? 'Login to like' : ''}
              >
                <FaHeart />
                {liked ? 'Liked' : 'Like'} ({currentBlog.likes?.length || 0})
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <FaShare />
                Share
              </button>
            </div>

            {/* Comments Section */}
            {currentBlog.commentsEnabled && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#014925] mb-6">
                  💬 Comments ({currentBlog.commentsCount || 0})
                </h2>

                {/* Add Comment Form */}
                <form onSubmit={handleSubmitComment} className="mb-8 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-[#014925]">Leave a Comment</h3>
                  
                  {/* Show login status */}
                  {user && (
                    <div className="mb-3 text-sm text-gray-600">
                      Commenting as <span className="font-semibold text-[#0C6F89]">{user.name}</span>
                    </div>
                  )}
                  
                  {/* Anonymous Toggle */}
                  <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 text-[#0C6F89] focus:ring-[#0C6F89]"
                      />
                      <span className="text-sm text-gray-700">Comment as Anonymous</span>
                    </label>
                  </div>

                  {/* Name Input - only if not logged in and not anonymous */}
                  {!user && !isAnonymous && (
                    <div className="mb-4">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C6F89] focus:border-transparent"
                        required
                      />
                    </div>
                  )}

                  {/* Comment Text */}
                  <div className="mb-4">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows="4"
                      placeholder="Write your comment here..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C6F89] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="px-6 py-2 bg-[#0C6F89] text-white rounded-lg hover:bg-[#014925] disabled:bg-gray-400 transition"
                  >
                    {submittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {currentBlog.comments && currentBlog.comments.length > 0 ? (
                    currentBlog.comments.map((comment) => (
                      <div key={comment._id} className="bg-white p-6 rounded-lg shadow-sm border">
                        {/* Comment Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                              {comment.isAnonymous ? '?' : comment.userName.charAt(0).toUpperCase()}
                            </div>
                            
                            {/* Name & Date */}
                            <div>
                              <p className="font-semibold text-gray-800">
                                {comment.isAnonymous ? 'Anonymous' : comment.userName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                                {comment.isEdited && <span className="ml-2 italic">(edited)</span>}
                              </p>
                            </div>
                          </div>

                          {/* Like Button */}
                          <button
                            onClick={() => handleLikeComment(comment._id)}
                            className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition"
                            title={!user ? 'Login to like' : ''}
                          >
                            <FaHeart className="text-sm" />
                            <span className="text-sm">{comment.likes?.length || 0}</span>
                          </button>
                        </div>

                        {/* Comment Text */}
                        <p className="text-gray-700 mb-3">{comment.comment}</p>

                        {/* Reply Button */}
                        <button
                          onClick={() => setReplyingTo(comment._id)}
                          className="text-[#0C6F89] text-sm flex items-center gap-1 hover:underline"
                        >
                          <FaReply /> Reply
                        </button>

                        {/* Reply Form */}
                        {replyingTo === comment._id && (
                          <div className="mt-4 ml-8 p-4 bg-gray-50 rounded-lg">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows="3"
                              placeholder="Write your reply..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSubmitReply(comment._id)}
                                className="px-4 py-1 bg-[#0C6F89] text-white rounded text-sm hover:bg-[#014925]"
                              >
                                Send Reply
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                className="px-4 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 ml-8 space-y-3">
                            {comment.replies.map((reply, idx) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white text-sm font-semibold">
                                    {reply.isAnonymous ? '?' : reply.userName.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-sm text-gray-800">
                                      {reply.isAnonymous ? 'Anonymous' : reply.userName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(reply.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700">{reply.comment}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-block px-6 py-2 bg-[#0C6F89] text-white rounded-lg hover:bg-[#014925] transition"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar - Related Posts */}
        <aside className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
          <h3 className="text-xl font-semibold text-[#0C6F89] mb-5">
            Related Posts
          </h3>

          {relatedPosts && relatedPosts.length > 0 ? (
            <div className="space-y-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  to={`/blog/${related._id}`}
                  className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  {related.image && (
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#014925] text-sm line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(related.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No related posts found.</p>
          )}
        </aside>
      </div>

      {/* More Blogs Section */}
      <BlogSection />

      <style jsx>{`
        .prose {
          line-height: 1.8;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
        .prose h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #0C6F89;
        }
        .prose h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #014925;
        }
        .prose p {
          margin-bottom: 1rem;
        }
        .prose ul, .prose ol {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }
        .prose a {
          color: #0C6F89;
          text-decoration: underline;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogDetail;