import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Wrapper(props) {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Wrapper;
