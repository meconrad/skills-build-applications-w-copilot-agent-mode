import express from 'express';
import mongoose from 'mongoose';
import db from './config/database.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`MongoDB configured at ${mongoUrl}`);
});
