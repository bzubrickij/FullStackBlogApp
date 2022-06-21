/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import BlogPreview from '../components/BlogPreview';
import ErrorText from '../components/ErrorText';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import Navigation from '../components/Navigation';
import config from '../config/config';
import BlogType from '../types/blog';
import { UserType } from '../types/user';

const HomePage: React.FunctionComponent<Record<string, unknown>> = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const getAllBlogs = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/blogs`,
      });

      if (response.status === (200 || 304)) {
        const blogs = response.data.blogs as BlogType[];
        blogs.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));

        setBlogs(blogs);
      } else {
        setError('Unable to retrieve blogs');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (loading) {
    return <LoadingComponent>Loading blogs...</LoadingComponent>;
  }

  return (
    <Container fluid className="p-0">
      <Navigation />
      <Header
        headline="Check out what unimportant people have to say"
        title="Yet Another Blog Website"
      />
      <Container className="mt-5">
        {blogs.length === 0 && (
          <p>
            There are no blogs yet.  You should
            {' '}
            <Link to="/edit">post</Link>
            {' '}
            one 😊.
          </p>
        )}
        {blogs.map((blog, index) => (
          <div key={index}>
            <BlogPreview
              _id={blog._id}
              author={(blog.author as UserType).name}
              headline={blog.headline}
              title={blog.title}
              createdAt={blog.createdAt}
              updatedAt={blog.updatedAt}
            />
            <hr />
          </div>
        ))}
        <ErrorText error={error} />
      </Container>
    </Container>
  );
};

export default HomePage;
