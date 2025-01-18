import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <About />
      <Services />
      <Contact />
    </motion.div>
  );
}

function App() {
  return (
    <Router basename="/studio2"> {/* Add basename prop */}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
