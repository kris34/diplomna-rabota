import { useState } from 'react';
import Header from '../../frontend/src/components/home_page/Header';
import HomePage from './pages/HomePage';
import Footer from './components/general/Footer';

function App() {
  return (
    <div className="home_page_container">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
