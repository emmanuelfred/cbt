import React, { useEffect, useState } from 'react';
import '../Style/Blog.css'
import BlogPost from '../Components/BlogPost/BlogPost'
import Banner from '../Components/Banner/Banner';
import Contact from '../Components/Contact/Contact';
import Newsletter from '../Components/Newsletter/Newsletter';



function Blog() {
    const [posts, setPosts] = useState([]);

    // Mock JSON from future database
    useEffect(() => {
      const fetchPosts = async () => {
        // In future, fetch from your backend
        const blogData = [
          {
            id: 1,
            title: "Creating Engaging Content for Online Education Platforms",
            date: "October 22, 2024",
            excerpt: "Online education and e-learning have revolutionized the way people learn",
            link: "/blog-page",
            image: "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg",
            classes: "post-4568 category-learning-blog tag-digital"
          },
          {
            id: 2,
            title: "Creating Engaging Content for Online Education Platforms",
            date: "October 22, 2024",
            excerpt: "Online education and e-learning have revolutionized the way people learn",
            link: "/blog-page",
            image: "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg",
            classes: "post-4568 category-learning-blog tag-digital"
          },
          {
            id: 3,
            title: "Creating Engaging Content for Online Education Platforms",
            date: "October 22, 2024",
            excerpt: "Online education and e-learning have revolutionized the way people learn",
            link: "/blog-page",
            image: "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg",
            classes: "post-4568 category-learning-blog tag-digital"
          },
          {
            id: 4,
            title: "Creating Engaging Content for Online Education Platforms",
            date: "October 22, 2024",
            excerpt: "Online education and e-learning have revolutionized the way people learn",
            link: "/blog-page",
            image: "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg",
            classes: "post-4568 category-learning-blog tag-digital"
          },
          {
            id: 5,
            title: "Creating Engaging Content for Online Education Platforms",
            date: "October 22, 2024",
            excerpt: "Online education and e-learning have revolutionized the way people learn",
            link: "/blog-page",
            image: "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg",
            classes: "post-4568 category-learning-blog tag-digital"
          },
          {
            id: 6,
            title: "Creating Engaging Content for Online Education Platforms",
            date: "October 22, 2024",
            excerpt: "Online education and e-learning have revolutionized the way people learn",
            link: "/blog-page",
            image: "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg",
            classes: "post-4568 category-learning-blog tag-digital"
          },
          // Add more blog objects here
        ];
  
        setPosts(blogData);
      };
  
      fetchPosts();
    }, []);
  return (
    <div>
        <Banner title="Our Latest Blogs" description="Discover a wide range of expert-led courses tailored to your personal and professional growth."/>
        <div className="blog-container container">
            
            <div className="elementor-grid">
                {posts.map(post => (
                <BlogPost key={post.id} post={post} />
                ))}
            </div>
        </div>
       
        <Newsletter/>

  
     
    </div>
  )
}

export default Blog