
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost} from '../features/posts/postSlice';
import { RootState, AppDispatch } from '../store';
import { TextField, Button, Container } from '@mui/material';

const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post.id === Number(id))
  );
  const [title, setTitle] = useState(post ? post.title : '');
  const [body, setBody] = useState(post ? post.body : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post) {
      dispatch(updatePost({ ...post, title, body }));
    } else {
      dispatch(createPost({ title, body }));
    }
    navigate('/');
  };

  return (
    <Container>
      <h2>{post ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {post ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default PostForm;
