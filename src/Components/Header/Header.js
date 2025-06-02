import React, { useEffect, useState } from 'react';
import './Header.css';
import ScrolNav from './Header_scroll/ScrolNav';
import Main_Nav from './Header_main/Main_Nav';
import MobileHeader from './Mobile/MobileHeader';

function Header() {
  const [showMainNav, setShowMainNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMainNav(window.scrollY > 50); // Change threshold as needed
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      {showMainNav ? <Main_Nav /> : <ScrolNav />}
      <MobileHeader />
    </header>
  );
}

export default Header;
