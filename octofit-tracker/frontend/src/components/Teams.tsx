import { useEffect, useState } from 'react';
import { apiEndpoint, fetchJson } from '../lib/api';

interface Team {
  _id: string;
  name: string;
  description: string;
  members: { name: string }[];
}

interface ApiResponse<T> {
  message: string;
  teams?: T[];
  data?: T[];
  results?: T[];
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<ApiResponse<Team[]>>('teams')
      .then((payload) => {
        setTeams(payload.teams ?? payload.data ?? payload.results ?? []);
      })
      .catch((err) => setError(err.message));
  }, []);

  const endpoint = apiEndpoint('teams');

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
