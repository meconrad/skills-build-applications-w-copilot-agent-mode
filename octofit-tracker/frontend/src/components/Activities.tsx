import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

interface Activity {
  _id: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  intensity: string;
  date: string;
  user?: { name: string };
}

interface ApiResponse<T> {
  message: string;
  activities?: T[];
  data?: T[];
  results?: T[];
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<ApiResponse<Activity[]>>('activities')
      .then((payload) => {
        setActivities(payload.activities ?? payload.data ?? payload.results ?? []);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-5">
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <p>API endpoint: <code>{`/api/activities/`}</code></p>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="row g-3">
          {activities.map((activity) => (
            <div key={activity._id} className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.type}</h5>
                  <p className="card-text">User: {activity.user?.name ?? 'Unknown'}</p>
                  <p className="card-text">Duration: {activity.durationMinutes} min</p>
                  <p className="card-text">Calories: {activity.caloriesBurned}</p>
                  {activity.distanceKm != null && <p className="card-text">Distance: {activity.distanceKm} km</p>}
                  <p className="card-text">Intensity: {activity.intensity}</p>
                  <p className="card-text"><small>{new Date(activity.date).toLocaleString()}</small></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
