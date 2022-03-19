import { Document} from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string | undefined;
    profilePic?: string;
    isAdmin?: Boolean;
  }
