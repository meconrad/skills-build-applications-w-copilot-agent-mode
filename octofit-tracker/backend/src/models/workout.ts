import { Schema, model, Types } from 'mongoose';

export interface WorkoutDocument {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: {
    name: string;
    sets: number;
    reps: number;
    restSeconds: number;
  }[];
  createdAt: Date;
  recommendedFor: Types.ObjectId[];
}

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      restSeconds: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: () => new Date() },
  recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default model<WorkoutDocument>('Workout', workoutSchema);
