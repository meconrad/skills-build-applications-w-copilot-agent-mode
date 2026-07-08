import express from 'express';
import LeaderboardEntry from '../models/leaderboard.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user team').lean();
  res.json({
    message: 'Retrieve leaderboard',
    leaderboard
  });
});

export default router;
