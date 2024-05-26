import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Movie from './pages/Movie';
import Review from './pages/Review';
import User from './pages/User';
import SignIn from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/all" />} />
        <Route path="/dashboard/all" element={<Dashboard />} />
        <Route path="/dashboard/tickets" element={<Dashboard />} />
        <Route path="/movie" element={<Navigate to="/movie/list" />} />
        <Route path="/movie/list" element={<Movie />} />
        <Route path="/movie/create" element={<Movie />} />
        <Route path="/movie/categories" element={<Movie />} />
        <Route path="/user" element={<User />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
