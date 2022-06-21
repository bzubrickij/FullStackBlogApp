import { Document } from 'mongoose';

interface IUser extends Document {
    uid: string;
    name: string;
}

export default IUser;
