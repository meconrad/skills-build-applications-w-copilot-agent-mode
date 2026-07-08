import { Schema, model, Types } from 'mongoose';

export interface TeamDocument {
  name: string;
  description: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
});

export default model<TeamDocument>('Team', teamSchema);
