import express from 'express';
import Workout from '../models/workout.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('recommendedFor').lean();
  res.json({
    message: 'Retrieve workouts',
    workouts
  });
});

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({
    message: 'Create workout',
    workout
  });
});

export default router;
