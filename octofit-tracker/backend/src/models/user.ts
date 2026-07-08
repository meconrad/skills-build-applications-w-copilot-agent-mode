import { Schema, model } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  goals: string[];
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
  goals: { type: [String], default: [] },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<UserDocument>('User', userSchema);
