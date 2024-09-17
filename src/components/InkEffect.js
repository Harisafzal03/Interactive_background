import React, { useRef, useEffect, useState } from 'react';

const InkEffect = () => {
  const canvasRef = useRef(null);
  const [ink, setInk] = useState({ active: false, x: 0, y: 0, radius: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawInk = () => {
      if (ink.active) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous ink effects

        const gradient = ctx.createRadialGradient(ink.x, ink.y, 0, ink.x, ink.y, ink.radius);
        gradient.addColorStop(0, 'rgba(128, 0, 128, 0.5)'); // Purple
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.5)'); // Darker area
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Fade to black

        ctx.beginPath();
        ctx.arc(ink.x, ink.y, ink.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Increase radius until it reaches 100px
        setInk(prev => ({
          ...prev,
          radius: Math.min(prev.radius + 5, 100) // Increment radius
        }));
      }
    };

    const animateInk = () => {
      requestAnimationFrame(animateInk);
      drawInk();
    };

    animateInk();

    window.addEventListener('mousedown', (event) => {
      setInk({ active: true, x: event.x, y: event.y, radius: 0 });
    });

    window.addEventListener('mousemove', (event) => {
      if (ink.active) {
        setInk(prev => ({ ...prev, x: event.x, y: event.y }));
      }
    });

    window.addEventListener('mouseup', () => {
      setInk(prev => ({ ...prev, active: false, radius: 0 }));
    });

    window.addEventListener('mouseout', () => {
      setInk({ active: false, x: 0, y: 0, radius: 0 });
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener('mousedown', () => {});
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('mouseup', () => {});
      window.removeEventListener('mouseout', () => {});
      window.removeEventListener('resize', () => {});
    };
  }, [ink]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 10 }} />;
};

export default InkEffect;
