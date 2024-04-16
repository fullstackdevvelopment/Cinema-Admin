import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Movie from './pages/Movie';
import User from './pages/User';
import Review from './pages/Review';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movie/movies" element={<Movie />} />
        <Route path="/movie/categories" element={<Movie />} />
        <Route path="/user" element={<User />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
