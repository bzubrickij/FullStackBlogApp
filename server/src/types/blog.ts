import { Document } from 'mongoose';
import IUser from './user';

interface BlogType extends Document {
    title: string;
    author: IUser;
    content: string;
    headline: string;
    picture?: string;
}
export default BlogType;
