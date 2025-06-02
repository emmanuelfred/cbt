import React from 'react';
import './BlogSection.css'; // Optional: Add styles here or use Tailwind/Bootstrap

const blogPosts = [
  {
    title: 'Essential Tools for Successful Online Learning Experiences',
    date: 'October 22, 2024',
    comments: 'No Comments',
    imageUrl:
      'https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/close-up-of-black-female-professor-having-video-ca-2023-11-27-05-25-06-RUTSJWF.jpg',
    link: 'https://theme.vividusmockup.com/learnease/2024/10/22/essential-tools-for-successful-online-learning-experiences/',
  },
  {
    title: 'Creating Engaging Content for Online Education Platforms',
    date: 'October 22, 2024',
    comments: 'No Comments',
    imageUrl:
      'https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg',
    link: 'https://theme.vividusmockup.com/learnease/2024/10/22/creating-engaging-content-for-online-education-platforms/',
  },
  {
    title: 'Creating Engaging Content for Online Education Platforms',
    date: 'October 22, 2024',
    comments: 'No Comments',
    imageUrl:
      'https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg',
    link: 'https://theme.vividusmockup.com/learnease/2024/10/22/creating-engaging-content-for-online-education-platforms/',
  },
];

const BlogSection = () => {
  return (
    <section className="blog-section mt-5 ">
      <h6 className="section-subtitle">Article</h6>
      <h2 className="section-title">
        Our Lates <span className="highlighted">Articles</span>
        
      </h2>
      <h6 className="section-description">
        Discover a wide range of expert-led courses tailored to your personal and professional growth.
      </h6>

      <div className="blog-posts">
        {blogPosts.map((post, index) => (
          <article key={index} className="blog-post">
            <a href={post.link} className="blog-thumbnail">
              <img src={post.imageUrl} alt={post.title} loading="lazy" />
            </a>
            <div className="blog-content">
              <h3>
                <a href={post.link}>{post.title}</a>
              </h3>
              <div className="meta">
                <span>{post.date}</span> | <span>{post.comments}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
