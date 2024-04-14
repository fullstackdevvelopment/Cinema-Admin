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
        <Route path="/" element={<Navigate to="dashboard/all" />} />
        <Route path="/dashboard/all" element={<Dashboard />} />
        <Route path="/dashboard/tickets" element={<Dashboard />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/user" element={<User />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
