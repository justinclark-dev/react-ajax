/*
  Credit: Claude AI
*/

import React, { useEffect, useRef } from 'react';

const Starfield = ({ width = 3840, height = 2160 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set resolution
    canvas.width = width;
    canvas.height = height;
    
    // Fill with pure black space
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Generate starfield
    const numStars = 2000;
    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.0;
      const brightness = Math.random();
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + brightness * 0.7})`;
      ctx.fill();
    }
    
    // Add some larger, brighter stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 0.1 + 1;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(241, 48, 48, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      gradient.addColorStop(0.4, 'rgba(14, 49, 190, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }, [width, height]);

  return (
    <canvas className="starfield"
      ref={canvasRef}
      style={{
        maxWidth: '100%',
        maxHeight: '100vh',
        display: 'block'
      }}
    />
  );
};

export default Starfield;