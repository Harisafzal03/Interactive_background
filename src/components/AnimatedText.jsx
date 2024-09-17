import React from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';

const AnimatedText = () => {
  // Title animation: Zoom in and then zoom out
  const titleBounce = useSpring({
    from: { opacity: 0, transform: 'scale(2)' },
    to: async (next) => {
      await next({ opacity: 1, transform: 'scale(1.2)' });
      await next({ transform: 'scale(1)' });
    },
    config: { tension: 180, friction: 12, mass: 1, clamp: true },
  });

  // Subtitle animation: Zoom in and then zoom out with a delay
  const subtitleLines = [
    "BUILD WITH THE FREE",
    "PARTICLE EFFECTS ADDON",
    "FOR SLIDER REVOLUTION"
  ];
  
  const subtitleTrail = useTrail(subtitleLines.length, {
    from: { opacity: 0, transform: 'scale(2)' },
    to: async (next) => {
      await next({ opacity: 1, transform: 'scale(1.2)' });
      await next({ transform: 'scale(1)' });
    },
    config: { tension: 180, friction: 12, mass: 1, clamp: true },
    delay: 300,
  });

  // Button animation: Zoom in and then zoom out with a delay
  const buttonBounce = useSpring({
    from: { opacity: 0, transform: 'scale(2)' },
    to: async (next) => {
      await next({ opacity: 1, transform: 'scale(1.2)' });
      await next({ transform: 'scale(1)' });
    },
    config: { tension: 180, friction: 12, mass: 1, clamp: true },
    delay: 900,
  });

  return (
    <div className="absolute text-center z-10">
      <animated.h1
        style={{
          ...titleBounce, // Combine animation styles with static styles
          background: 'linear-gradient(to right, #9357cc 0%, #2989d8 50%, #2cc99d 100%)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
        className="text-5xl sm:text-7xl font-light leading-tight tracking-[0.5em] text-transparent bg-clip-text"
      >
        GEOMETRIC<br/>DESIGN
      </animated.h1>
      
      <div className="mt-6 text-sm sm:text-base font-light text-[#04253C] tracking-[0.5em]">
        {subtitleTrail.map((style, index) => (
          <animated.p key={index} style={style}>
            {subtitleLines[index]}
          </animated.p>
        ))}
      </div>
      
      <animated.button style={buttonBounce} className="mt-8 px-8 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-600">
        Get Started
      </animated.button>
    </div>
  );
};

export default AnimatedText;
