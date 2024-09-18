import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
// import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parallex" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
