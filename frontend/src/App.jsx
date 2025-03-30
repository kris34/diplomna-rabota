import { useState } from 'react';
import Header from '../../frontend/src/components/home_page/Header';
import HomePage from './pages/HomePage';
import Footer from './components/general/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="home_page_container">
      <Header />
      <Outlet /> {/* This will render the matched route's component */}
      <Footer />
    </div>
  );
}

export default App;
