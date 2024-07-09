import React, { useState } from 'react';
import styles from './imagezoom.module.css'; // Import the CSS file for styling

const ImageZoom = ({ src, zoomScale }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [overlayStyle, setOverlayStyle] = useState({});

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const overlaySize = rect.width / zoomScale;
    // console.log(e.clientX, rect.top);
    // console.log(rect.left);
    // console.log(e.clientY);

    setZoomStyle({
      backgroundPosition: `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`
    });

    setOverlayStyle({
      left: `${x - overlaySize / 2}px`,
      top: `${y - overlaySize / 2}px`,
      width: `${overlaySize}px`,
      height: `${overlaySize}px`,
      display: 'block'
    });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setOverlayStyle({
      display: 'none'
    });
  };

  return (
    <div className={styles.imageZoomContainer}>
      <div className={styles.imageContainer}>
        <img
          src={src}
          alt="Zoomable"
          className={styles.zoomImage}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        <div className={styles.zoomOverlay} style={overlayStyle}></div>
      </div>
      
      {isZoomed && (
        <div
          className={styles.zoomResult}
          style={{
            ...zoomStyle,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomScale * 100}%`
          }}
        ></div>
      )}
    </div>
  );
};

export default ImageZoom;
