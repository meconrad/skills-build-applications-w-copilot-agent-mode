import express from 'express';
import { connectToDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const defaultPort = 8000;
const port = process.env.PORT ? Number(process.env.PORT) : defaultPort;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API is running',
    apiBaseUrl: codespaceName ? `https://${codespaceName}-8000.githubpreview.dev` : `http://localhost:${port}`
  });
});

async function startServer() {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`MongoDB configured at ${mongoUrl}`);
    if (codespaceName) {
      console.log(`Codespaces API URL: https://${codespaceName}-8000.githubpreview.dev`);
    }
  });
}

startServer();
