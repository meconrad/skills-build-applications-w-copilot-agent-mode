import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

interface Workout {
  _id: string;
  name: string;
  description: string;
  difficulty: string;
  exercises: { name: string; sets: number; reps: number; restSeconds: number }[];
  recommendedFor: { name: string }[];
}

interface ApiResponse<T> {
  message: string;
  workouts?: T[];
  data?: T[];
  results?: T[];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<ApiResponse<Workout[]>>('workouts')
      .then((payload) => {
        setWorkouts(payload.workouts ?? payload.data ?? payload.results ?? []);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-5">
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <p>API endpoint: <code>{`/api/workouts/`}</code></p>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="card-text">Difficulty: {workout.difficulty}</p>
                  <p className="card-text">Exercises:</p>
                  <ul>
                    {workout.exercises.map((exercise) => (
                      <li key={exercise.name}>
                        {exercise.name} — {exercise.sets} sets x {exercise.reps} reps, rest {exercise.restSeconds}s
                      </li>
                    ))}
                  </ul>
                  <p>
                    Recommended for: {workout.recommendedFor?.map((user) => user.name).join(', ') || 'Everyone'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
