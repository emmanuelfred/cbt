import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import placehoder from '../Assets/banner/placeholder.png';

function ImageWithLoading({
  alt,
  width = '100%',
  height = 200,
  maxWidth = '100%',
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
    className="skeleton-shimmer"
      style={{
        width,
        height,
        maxWidth,
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden', // Ensure border radius clips children
        backgroundColor: '#e0e0e0',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      {!loaded && (
        <Skeleton
          height="100%"
          width="100%"
          borderRadius={0} // Already handled by parent
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
          
        />
      )}
      <img
        src={placehoder}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: '50%',
          height: '50%',
          objectFit: 'contain',
          borderRadius: 8,
          display: 'block',
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
}

export default ImageWithLoading;
