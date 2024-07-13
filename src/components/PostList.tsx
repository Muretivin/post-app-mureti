import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchPosts, deletePost } from '../features/posts/postSlice';
import { Button, List, ListItem, ListItemText, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, loading, error, currentPage, totalPages } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(fetchPosts(1));
    }
  }, [dispatch, currentPage]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight) {
      if (currentPage < totalPages && !loading) {
        dispatch(fetchPosts(currentPage + 1));
      }
    }
  };

  if (loading && currentPage === 1) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="container" onScroll={handleScroll} style={{ height: '400px', overflowY: 'auto' }}>
      <Button variant="contained" color="primary" component={Link} to="/create" className="create">
        Create Post
      </Button>
      <List className="list">
        {posts.map((post) => (
          <ListItem key={post.id} className="list-item">
            <ListItemText primary={post.title} className="list-item-text" />
            <Button variant="contained" color="primary" component={Link} to={`/view/${post.id}`} className="view">
              View
            </Button>
            <Button variant="contained" color="secondary" component={Link} to={`/edit/${post.id}`} className="edit">
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => dispatch(deletePost(post.id))} className="delete">
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      {loading && <p>Loading more...</p>}
      {currentPage >= totalPages && <p>No more posts</p>}
    </Container>
  );
};

export default PostList;
