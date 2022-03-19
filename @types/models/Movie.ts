import { Document} from 'mongoose';

export interface Movie extends Document {
    title: String;
    desc: String ;
    img: String ;
    imgTitle: String ;
    imgSm: String ;
    trailer: String ;
    video: String ;
    year: String ;
    limit: Number ;
    genre: String ;
    isSeries: Boolean;
  }
