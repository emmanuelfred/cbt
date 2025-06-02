// src/components/BlogPost.js
import React from 'react';
import './BlogPost.css'; // Assuming you have a CSS file for styling

const BlogPost = ({ post }) => {
  return (
    <article className="post">
      <a className="post__thumbnail__link" href={post.link} tabIndex="-1">
        <div className="post__thumbnail">
          <img
          
        
            src={post.image}
            className="attachment-full size-full"
            alt={post.title}
          />
        </div>
      </a>

      <div className="post__text">
        <h3 className="post__title">
          <a href={post.link}>{post.title}</a>
        </h3>
        <div className="post__meta-data">
          <span className="post-date">{post.date}</span>
          <span className="post-avatar">No Comments</span>
        </div>
        <div className="post__excerpt">
          <p>{post.excerpt}</p>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
