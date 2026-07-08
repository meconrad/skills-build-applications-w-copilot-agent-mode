import { Schema, model, Types } from 'mongoose';

export interface LeaderboardEntryDocument {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  rank: number;
  score: number;
  period: string;
}

const leaderboardSchema = new Schema<LeaderboardEntryDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  period: { type: String, required: true }
});

export default model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardSchema);
