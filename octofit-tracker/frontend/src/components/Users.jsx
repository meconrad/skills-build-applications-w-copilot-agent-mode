import { useEffect, useState } from 'react';
import { apiEndpoint, fetchJson } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJson('users')
      .then((payload) => {
        setUsers(payload.users ?? payload.data ?? payload.results ?? []);
      })
      .catch((err) => setError(err.message));
  }, []);

  const endpoint = apiEndpoint('users');

  return (
    <div className="container py-5">
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <p>API endpoint: <code>{endpoint}</code></p>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id} className="list-group-item">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
              <span className="badge bg-secondary me-2">{user.role}</span>
              <div>{user.goals?.join(', ')}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
