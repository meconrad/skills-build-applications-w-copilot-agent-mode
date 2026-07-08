import { Schema, model, Types } from 'mongoose';

export interface ActivityDocument {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  intensity: 'low' | 'medium' | 'high';
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  distanceKm: { type: Number },
  intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  date: { type: Date, required: true }
});

export default model<ActivityDocument>('Activity', activitySchema);
