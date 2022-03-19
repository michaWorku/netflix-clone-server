import mongoose, { Schema, Types }  from 'mongoose';
import { List } from '../@types/models/List'

const ListSchema = new mongoose.Schema<List>(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content:[{
        type: Schema.Types.ObjectId, 
        ref: 'Movie' 
    }]
  },
  { timestamps: true }
);

export default mongoose.model("List", ListSchema);
