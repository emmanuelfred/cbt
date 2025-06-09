import React, { useEffect, useState } from 'react';
import '../Style/Blog.css'
import BlogPost from '../Components/BlogPost/BlogPost'
import Banner from '../Components/Banner/Banner';
import Contact from '../Components/Contact/Contact';
import Newsletter from '../Components/Newsletter/Newsletter';
import ImageWithLoading from '../Components/ImageWithLoading';
import AOS from 'aos';
import ServiceSection from '../Components/ServiceSection/ServiceSection';



function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simulate loading for 2 seconds
  const timer = setTimeout(() => setLoading(false), 1000);
  return () => clearTimeout(timer);
}, []);
useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false, // ← allows the animation to happen more than once
  });
}, []);

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
        <Banner title="Our Latest Blogs"
         description="Discover a wide range of expert-led courses tailored to your personal and professional growth."/>
         {loading ? 
         (<div style={{padding:10}} data-aos="zoom-out"><ImageWithLoading height={600}/></div>)
          : (
            <>
            <div className="blog-container container" data-aos="zoom-out">
                
                <div className="elementor-grid">
                    {posts.map(post => (
                    <BlogPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
            <div data-aos="zoom-out">
            <Contact/>
            </div>
            <div data-aos="zoom-out">
            <ServiceSection/>
            </div>

            <div data-aos="zoom-out">
            <Newsletter/>
            </div>
            
           
           
            
            </>


          )}
        
        
       
        

  
     
    </div>
  )
}

export default Blog