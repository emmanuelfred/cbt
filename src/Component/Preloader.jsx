// Preloader.jsx
import { useEffect, useState } from "react";


const Preloader = () => {
  const [expand, setExpand] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Start expanding after 1s (when ball reaches middle)
    const timer = setTimeout(() => setExpand(true), 1000);

    // Remove preloader from DOM after expand animation (0.5s)
    const removeTimer = setTimeout(() => setVisible(false), 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null; // remove preloader completely

  return (
    <div className="preloader-container">
      <div className={`ball ${expand ? "expand" : "fall"}`}></div>
    </div>
  );
};

export default Preloader;
