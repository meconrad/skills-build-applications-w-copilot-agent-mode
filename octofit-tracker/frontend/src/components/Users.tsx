import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  goals: string[];
}

interface ApiResponse<T> {
  message: string;
  users?: T[];
  data?: T[];
  results?: T[];
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<ApiResponse<User[]>>('users')
      .then((payload) => {
        setUsers(payload.users ?? payload.data ?? payload.results ?? []);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-5">
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <p>API endpoint: <code>{`/api/users/`}</code></p>
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
