import React from 'react';
import './App.css';
import Navbar from './Dashboard/Navbar/Navbar';
import Main from './Dashboard/Main/Main';
import Footer from './Dashboard/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <div className="FooterWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default App;
