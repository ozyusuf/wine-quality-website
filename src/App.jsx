import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <Router>
      <div className="bg-tech-dark text-white font-sans selection:bg-tech-purple selection:text-white overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>


      </div>
    </Router>
  );
}

export default App;
