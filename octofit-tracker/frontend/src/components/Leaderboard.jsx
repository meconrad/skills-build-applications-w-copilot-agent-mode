import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpoint = codespaceName 
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
    : `http://localhost:8000/api/leaderboard`;

  useEffect(() => {
    fetchJson('leaderboard')
      .then((payload) => {
        setEntries(payload.leaderboard ?? payload.data ?? payload.results ?? []);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-5">
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <p>API endpoint: <code>{endpoint}</code></p>
      {entries.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Score</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.rank}</td>
                <td>{entry.user?.name}</td>
                <td>{entry.team?.name || 'Individual'}</td>
                <td>{entry.score}</td>
                <td>{entry.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
