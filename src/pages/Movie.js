import React from 'react';
import Header from '../Component/Header';

function Movie() {
  return (
    <div className="container">
      <div className="dashboard__page">
        <Header />
        <div className="page">
          <p className="dashboard__header"> movies</p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
