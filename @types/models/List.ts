import { Document, Types } from 'mongoose';

export interface List extends Document {
    title:String;
    type: String;
    genre: String ;
    content: Array<Types.ObjectId>;
  }