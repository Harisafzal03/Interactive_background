import React from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';

const AnimatedText = () => {

  const titleBounce = useSpring({
    from: { opacity: 0, transform: 'scale(2)', textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
    to: { opacity: 1, transform: 'scale(1)'},
    config: { tension: 180, friction: 12, mass: 1, clamp: true ,duration: 500 },
    delay: 200, 
  });

  const subtitleLines = [
    "BUILD WITH THE FREE",
    "PARTICLE EFFECTS ADDON",
    "FOR SLIDER REVOLUTION"
  ];

  const subtitleTrail = useTrail(subtitleLines.length, {
    from: { opacity: 0, transform: 'scale(2)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 180, friction: 12, mass: 1, clamp: true ,duration: 300 },
    delay: 600,
  });

  const buttonBounce = useSpring({
    from: { opacity: 0, transform: 'scale(2)' },
    to: { opacity: 0.9, transform: 'scale(1)' },
    config: { tension: 180, friction: 12, mass: 1, clamp: true },
    delay: 1000, 
  });

  return (
    <div className="absolute text-center z-10 select-none">
      <animated.h1
        style={{
          ...titleBounce,
          background: 'linear-gradient(to right, #9357cc 0%, #2989d8 50%, #2cc99d 100%)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
        className="text-2xl sm:text-6xl font-normal leading-tight tracking-[0.2em] text-transparent bg-clip-text"
      >
        GEOMETRIC<br />DESIGN
      </animated.h1>

      <div className="mt-6 text-sm sm:text-base font-normal text-[#04253C] tracking-[0.5em] select-none">
        {subtitleTrail.map((style, index) => (
          <animated.p key={index} style={style}>
            {subtitleLines[index]}
          </animated.p>
        ))}
      </div>

      <animated.button
        style={{
          ...buttonBounce,
          background: 'linear-gradient(to right, #9357cc 0%, #2989d8 50%, #2cc99d 100%)',
          WebkitBackgroundClip: 'button',
          color: 'transparent',
          opacity: buttonBounce.opacity.to(o => o),
        }}
        className="mt-8 px-8 py-3 text-white font-medium transition-all duration-300"
      >
        <p className="text-white uppercase tracking-widest opacity-100 select-none">Get Addon</p>
      </animated.button>
    </div>
  );
};

export default AnimatedText;
