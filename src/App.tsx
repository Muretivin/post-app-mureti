// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/create" element={<PostForm />} />
      <Route path="/edit/:id" element={<PostForm />} />
      <Route path="/view/:id" element={<PostDetail />} />
    </Routes>
  );
};

export default App;
