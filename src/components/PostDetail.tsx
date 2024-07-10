// src/components/PostDetail.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { fetchPosts } from '../features/posts/postSlice';
import { Container, Button, Typography, Card, CardContent, CardActions } from '@mui/material';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const post = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post.id === Number(id))
  );

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts());
    }
  }, [dispatch, post]);

  if (!post) return <p>Loading...</p>;

  return (
    <Container className="container">
      <Card className="card">
        <CardContent>
          <Typography variant="h4" className="title">
            {post.title}
          </Typography>
          <Typography variant="body1" className="body">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" component={Link} to="/">
            Back to Posts
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default PostDetail;
