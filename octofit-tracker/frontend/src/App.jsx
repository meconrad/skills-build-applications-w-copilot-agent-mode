import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiHelpText } from './lib/api.js';

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">Multi-tier fitness tracker built with React, Express, and MongoDB.</p>
          <div className="alert alert-info py-2">{apiHelpText}</div>
        </header>

        <nav className="nav nav-pills mb-4">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
        </nav>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
