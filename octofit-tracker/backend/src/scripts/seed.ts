import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.create([
      { name: 'Avery Chen', email: 'avery.chen@example.com', role: 'member', goals: ['run a 10K', 'build strength'] },
      { name: 'Maya Patel', email: 'maya.patel@example.com', role: 'coach', goals: ['improve endurance'] },
      { name: 'Jordan Brooks', email: 'jordan.brooks@example.com', role: 'member', goals: ['increase flexibility', 'track calories'] }
    ]);

    const teams = await Team.create([
      { name: 'Morning Marauders', description: 'Runners and cyclists who train before 8 AM.', members: [users[0]._id, users[2]._id] },
      { name: 'Fit Guild', description: 'Fitness enthusiasts focused on strength training.', members: [users[1]._id] }
    ]);

    const workouts = await Workout.create([
      {
        name: 'Foundational Strength Circuit',
        description: 'A balanced beginner strength routine with compound exercises.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Bodyweight Squats', sets: 3, reps: 12, restSeconds: 60 },
          { name: 'Push-ups', sets: 3, reps: 10, restSeconds: 60 },
          { name: 'Plank', sets: 3, reps: 1, restSeconds: 45 }
        ],
        recommendedFor: [users[0]._id, users[2]._id]
      },
      {
        name: 'Endurance Builder',
        description: 'A moderate cardio and mobility workout for consistent stamina gains.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Jogging', sets: 1, reps: 1, restSeconds: 0 },
          { name: 'Walking Lunges', sets: 3, reps: 20, restSeconds: 45 },
          { name: 'Jump Rope', sets: 3, reps: 120, restSeconds: 45 }
        ],
        recommendedFor: [users[0]._id]
      }
    ]);

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'Outdoor Run',
        durationMinutes: 42,
        caloriesBurned: 470,
        distanceKm: 8.3,
        intensity: 'high',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        user: users[2]._id,
        type: 'Yoga Flow',
        durationMinutes: 55,
        caloriesBurned: 240,
        intensity: 'medium',
        date: new Date(Date.now() - 1000 * 60 * 60 * 48)
      },
      {
        user: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 70,
        caloriesBurned: 620,
        intensity: 'high',
        date: new Date(Date.now() - 1000 * 60 * 60 * 72)
      }
    ]);

    const leaderboard = await LeaderboardEntry.create([
      { user: users[0]._id, team: teams[0]._id, rank: 1, score: 1290, period: 'weekly' },
      { user: users[2]._id, team: teams[0]._id, rank: 2, score: 980, period: 'weekly' },
      { user: users[1]._id, team: teams[1]._id, rank: 1, score: 1410, period: 'weekly' }
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${teams.length} teams`);
    console.log(`Created ${workouts.length} workouts`);
    console.log(`Created ${activities.length} activities`);
    console.log(`Created ${leaderboard.length} leaderboard entries`);

    await mongoose.disconnect();
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
