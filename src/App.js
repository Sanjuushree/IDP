import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import History from './pages/History';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/upload" element={<><Navbar /><Upload /></>} />
        <Route path="/analysis" element={<><Navbar /><Analysis /></>} />
        <Route path="/history" element={<><Navbar /><History /></>} />
        <Route path="/services" element={<><Navbar /><Services /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/settings" element={<><Navbar /><Settings /></>} />
      </Routes>
    </Router>
  );
}

export default App;