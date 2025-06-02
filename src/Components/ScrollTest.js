import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ScrollTest = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  return (
    <div>
      <div style={{ height: '100vh', background: '#eee' }}>Scroll down</div>
      <div data-aos="fade-up" style={{ height: '100px', background: 'lightblue' }}>
        I animate on scroll!
      </div>
      <div style={{ height: '100vh', background: '#ddd' }}>Scroll back up</div>
    </div>
  );
};

export default ScrollTest;
