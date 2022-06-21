import { UserType } from './user';

type BlogType = {
  _id: string,
  title: string,
  author: string | UserType,
  content: string,
  headline: string,
  picture?: string,
  createdAt: string,
  updatedAt: string,
};

export default BlogType;
