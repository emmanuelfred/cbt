import React, { useEffect, useState } from 'react';
import './BlogSection.css'; // Optional: Add styles here or use Tailwind/Bootstrap
import Skeleton from 'react-loading-skeleton';
import ImageWithLoading from '../ImageWithLoading';
const blogPosts = [
  {
    title: 'Essential Tools for Successful Online Learning Experiences',
    date: 'October 22, 2024',
    comments: 'No Comments',
    imageUrl:
      'https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/close-up-of-black-female-professor-having-video-ca-2023-11-27-05-25-06-RUTSJWF.jpg',
    link: '/blog-page',
  },
  {
    title: 'Creating Engaging Content for Online Education Platforms',
    date: 'October 22, 2024',
    comments: 'No Comments',
    imageUrl:
      'https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg',
    link: '/blog-page',
  },
  {
    title: 'Creating Engaging Content for Online Education Platforms',
    date: 'October 22, 2024',
    comments: 'No Comments',
    imageUrl:
      'https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg',
    link: '/blog-page',
  },
];

const BlogSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="blog-section mt-5">
      {loading ? (
        <div className="text-center mb-4">
          <Skeleton width={'30%'} height={40} />
          <Skeleton width={'50%'} height={50} />
          <Skeleton width={'70%'} height={20} />
        </div>
      ) : (
        <>
          <h6 className="section-subtitle">Article</h6>
          <h2 className="section-title">
            Our Latest <span className="highlighted">Articles</span>
          </h2>
          <h6 className="section-description">
            Discover a wide range of expert-led courses tailored to your personal and professional growth.
          </h6>
        </>
      )}
     

      <div className="blog-posts">
        {(loading ? Array(3).fill({}) : blogPosts).map((post, index) => (
          <article key={index} className="blog-post">
            <a href={post.link || '#'} className="blog-thumbnail">
              {loading ? (
               
                <ImageWithLoading height={250} />
              ) : (
                <img src={post.imageUrl} alt={post.title} loading="lazy" />
              )}
            </a>
            <div className="blog-content">
              <h3>
                {loading ? <Skeleton width={`80%`} height={24} /> : <a href={post.link}>{post.title}</a>}
              </h3>
              <div className="meta">
                {loading ? (
                  <Skeleton width={`60%`} height={16} />
                ) : (
                  <>
                    <span>{post.date}</span> | <span>{post.comments}</span>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;

