import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import AOS from 'aos';

function Banner(props) {
  const { title, description } = props;

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
  return (
    <div
      style={{
        backgroundColor: '#F8F9F5',
        padding: '50px 0',
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      className="bg-line mb-5 banner"
      data-aos="zoom-out"
    >
      <div
        className="text-center"
        style={{
          height: '90%',
          width: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <h3 data-aos="fade-up" data-aos-delay="500">{loading ? <Skeleton width={200} height={40} /> : title}</h3>
        <h2 data-aos="fade-up" data-aos-delay="600">{loading ? <Skeleton width={400} height={50} /> : description}</h2>
      </div>
    </div>
  );
}

export default Banner;
