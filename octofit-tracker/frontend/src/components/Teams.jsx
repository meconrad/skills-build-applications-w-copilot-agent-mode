import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpoint = codespaceName 
    ? `https://${codespaceName}-8000.app.github.dev/api/teams`
    : `http://localhost:8000/api/teams`;

  useEffect(() => {
    fetchJson('teams')
      .then((payload) => {
        setTeams(payload.teams ?? payload.data ?? payload.results ?? []);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-5">
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <p>API endpoint: <code>{endpoint}</code></p>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id} className="list-group-item">
              <h5>{team.name}</h5>
              <p>{team.description}</p>
              <div>
                Members: {team.members?.map((member) => member.name).join(', ') || 'None'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
