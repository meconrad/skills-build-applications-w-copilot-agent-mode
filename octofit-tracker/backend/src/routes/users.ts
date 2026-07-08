import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json({
    message: 'Retrieve users',
    users
  });
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    message: 'Create user',
    user
  });
});

export default router;
