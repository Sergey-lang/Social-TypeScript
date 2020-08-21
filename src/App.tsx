import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Navbar from './component/Navbar/Navbar';
import Profile from './component/Profile/Profile';


function App() {
  return (
    <div className='all_wrapper'>
      <Header />
      <div className='app_wrapper'>
        <Navbar />
        <Profile />
      </div>
    </div>
  );
}

export default App;
