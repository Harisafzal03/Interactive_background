import React from 'react';
import InteractiveBackground from '../components/InteractiveBackground';
import AnimatedText from '../components/AnimatedText';

function Home() {
  return (
    <div className="App relative flex items-center justify-center h-screen">
      <InteractiveBackground />
      <AnimatedText />
    </div>
  );
}

export default Home;