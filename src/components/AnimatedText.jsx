import React from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';

const AnimatedText = () => {
  const titleBounce = useSpring({
    from: { opacity: 0, transform: 'scale(2)' },
    to: async (next) => {
      await next({ opacity: 1, transform: 'scale(1)' });
      await next({ transform: 'scale(1)' });
    },
    config: { tension: 180, friction: 12, mass: 1, clamp: true },
  });

  const subtitleLines = [
    "BUILD WITH THE FREE",
    "PARTICLE EFFECTS ADDON",
    "FOR SLIDER REVOLUTION"
  ];
  
  const subtitleTrail = useTrail(subtitleLines.length, {
    from: { opacity: 0, transform: 'scale(2)' },
    to: async (next) => {
      await next({ opacity: 1, transform: 'scale(1)' });
      await next({ transform: 'scale(1)' });
    },
    config: { tension: 180, friction: 12, mass: 1, clamp: true },
    delay: 100,
  });

  const buttonBounce = useSpring({
    from: { opacity: 0, transform: 'scale(2)' },
    to: async (next) => {
      await next({ opacity: 1, transform: 'scale(1)' });
      await next({ transform: 'scale(1)' });
    },
    config: { tension: 180, friction: 12, mass: 1, clamp: true },
    delay: 900,
  });

  return (
    <div className="absolute text-center mb-40 z-10">
      <animated.h1
        style={{
          ...titleBounce, 
          background: 'linear-gradient(to right, #9357cc 0%, #2989d8 50%, #2cc99d 100%)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
        className="text-2xl sm:text-6xl font-normal leading-tight tracking-[0.2em] text-transparent bg-clip-text"
      >
        GEOMETRIC<br/>DESIGN
      </animated.h1>
      
      <div className="mt-6 text-sm sm:text-base font-normal text-[#04253C] tracking-[0.5em]">
        {subtitleTrail.map((style, index) => (
          <animated.p key={index} style={style}>
            {subtitleLines[index]}
          </animated.p>
        ))}
      </div>
      
      <animated.button
        style={{
        ...buttonBounce, 
        ...titleBounce, 
        background: 'linear-gradient(to right, #9357cc 0%, #2989d8 50%, #2cc99d 100%)',
        WebkitBackgroundClip: 'button',
        color: 'transparent',
        opacity: 0.9
        }}
        className="mt-8 px-8 py-3 text-white font-medium transition-all duration-300"
       >
        <p className='text-white uppercase tracking-widest opacity-100'>Get Addon</p>
      </animated.button>
    </div>
  );
};

export default AnimatedText;