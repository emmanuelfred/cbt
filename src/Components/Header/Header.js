import React, { useEffect, useState } from 'react';
import './Header.css';
import ScrolNav from './Header_scroll/ScrolNav';
import Main_Nav from './Header_main/Main_Nav';
import MobileHeader from './Mobile/MobileHeader';

function Header() {
  const [showMainNav, setShowMainNav] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setShowMainNav(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      {showMainNav ? <Main_Nav /> : <ScrolNav active={active} setActive={setActive} />}
      <MobileHeader />
    </header>
  );
}

export default Header;
