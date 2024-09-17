import React from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import AnimatedText from './components/AnimatedText';
import InkEffect from './components/InkEffect';

function App() {

  return (
    <div className="App relative flex items-center justify-center h-screen">
      <InteractiveBackground />
      {/* <InkEffect/> */}
      <AnimatedText />
    </div>
  );
}

export default App;
