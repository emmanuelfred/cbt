import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BlogSection from "../Component/BlogSection";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`https://backend-w94p.onrender.com/api/blog/get_blog/${id}`);
        setBlog(data.blog);
        setRelatedPosts(data.related);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);
  console.log("Blog Data:", blog);
  console.log("Related Posts:", relatedPosts);

  if (loading)
    return (
      <div className="text-center py-20">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );

  if (!blog)
    return (
      <div className="py-20 text-center">
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

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-7xl grid md:grid-cols-3 gap-8">
        {/* Blog Content */}
        <div className="md:col-span-2 p-6 bg-white shadow-sm rounded-lg">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-72 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-[#0C6F89] mb-4">{blog.title}</h1>

          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>
              Author:{" "}
              <span className="text-[#014925] font-medium">
                {blog.author|| "Unknown"}
              </span>
            </span>
            <span>
              Category:{" "}
              <span className="text-[#0C6F89] font-medium">
                {blog.category|| "Uncategorized"}
              </span>
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>

          <div className="mt-8">
            <Link
              to="/blog"
              className="btn btn-success text-white px-4 py-2 rounded-pill"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        <aside className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#0C6F89] mb-5">
            Related Posts
          </h3>

          {relatedPosts.length > 0 ? (
            relatedPosts.map((related) => (
              <Link
                key={related._id}
                to={`/blog/${related._id}`}
                className="d-flex align-items-start mb-4 text-decoration-none text-dark hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="ms-3">
                  <h4 className="fw-semibold text-[#014925]">{related.title}</h4>
                  <p className="small text-muted mt-1">
                    {related.content.slice(0, 60)}...
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-muted">No related posts found.</p>
          )}
        </aside>
      </div>
      <BlogSection />
    </section>
  );
};

export default BlogDetail;
