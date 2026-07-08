import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">OctoFit Tracker</h1>
      <p className="lead">Modern multi-tier fitness tracker powered by React, Express, and MongoDB.</p>
      <p>Start building workout logging, teams, leaderboards, and user profiles.</p>
    </div>
  );
}

export default App;
