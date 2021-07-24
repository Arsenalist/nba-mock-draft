import * as mongoose from 'mongoose';
import { Player } from '@raptors/api-interfaces';

const playerSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String },
  position: { type: String, required: true },
  school: { type: String, required: true },
  year: { type: String, required: true }
});
type PlayerType = Player & mongoose.Document;
export const PlayerModel = mongoose.model<PlayerType>('Player', playerSchema);

const entrySchema = new mongoose.Schema({
  players: { type: [playerSchema], required: true }
});

type EntryType = Player & mongoose.Document;
export const EntryModel = mongoose.model<EntryType>('Entry', entrySchema);
