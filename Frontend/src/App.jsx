import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quizform from './Pages/Quizform'; // Ensure correct import path
import ResultsPage from './Pages/Result'; // Ensure correct import path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quizform />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
