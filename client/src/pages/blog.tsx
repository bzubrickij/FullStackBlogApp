/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-danger */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Redirect, RouteComponentProps, useHistory, withRouter, Link,
} from 'react-router-dom';
import {
  Button, Container, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import ErrorText from '../components/ErrorText';
import Header from '../components/Header';
import LoadingComponent, { Loading } from '../components/LoadingComponent';
import Navigation from '../components/Navigation';
import config from '../config/config';
import UserContext from '../contexts/user';
import BlogType from '../types/blog';
import { UserType } from '../types/user';

const BlogPage: React.FunctionComponent<RouteComponentProps<any>> = (props) => {
  const [_id, setId] = useState<string>('');
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [modal, setModal] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const { user } = useContext(UserContext).userState;
  const history = useHistory();

  useEffect(() => {
    const _blogId = props.match.params.blogID;

    if (_blogId) {
      setId(_blogId);
    } else {
      history.push('/');
    }
  }, []);

  const getBlog = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/blogs/read/${_id}`,
      });

      if (response.status === (200 || 304)) {
        setBlog(response.data.blog);
      } else {
        setError(`Unable to retrieve blog ${_id}`);
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
    if (_id !== '') { getBlog(); }
  }, [_id]);

  const deleteBlog = async () => {
    setDeleting(true);

    try {
      const response = await axios({
        method: 'DELETE',
        url: `${config.server.url}/blogs/${_id}`,
      });

      if (response.status === 201) {
        setTimeout(() => {
          history.push('/');
        }, 1000);
      } else {
        setError(`Unable to retrieve blog ${_id}`);
        setDeleting(false);
      }
    } catch (error: any) {
      setError(error.message);
      setDeleting(false);
    }
  };

  if (loading) return <LoadingComponent>Loading Blog ...</LoadingComponent>;

  if (blog) {
    return (
      <Container fluid className="p-0">
        <Navigation />
        <Modal isOpen={modal}>
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>
            {deleting
              ? <Loading />
              : 'Are you sure you want to delete this blog?'}
            <ErrorText error={error} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => deleteBlog()}>Delete Permanently</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Header
          image={blog.picture || undefined}
          headline={blog.headline}
          title={blog.title}
        >
          <p className="text-white">
            Posted by
            {' '}
            {(blog.author as UserType).name}
            {' '}
            on
            {' '}
            {new Date(blog.createdAt).toLocaleString()}
          </p>
        </Header>
        <Container className="mt-5">
          {user._id === (blog.author as UserType)._id
            && (
              <Container fluid className="p-0">
                <Button color="info" className="mr-2" tag={Link} to={`/edit/${blog._id}`}>
                  <i className="fas fa-edit mr-2" />
                  Edit
                </Button>
                <Button color="danger" onClick={() => setModal(true)}>
                  <i className="far fa-trash-alt mr-2" />
                  Delete
                </Button>
                <hr />
              </Container>
            )}
          <ErrorText error={error} />
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Container>
      </Container>
    );
  }
  return <Redirect to="/" />;
};

export default withRouter(BlogPage);
