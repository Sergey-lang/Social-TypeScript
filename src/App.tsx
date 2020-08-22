import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Navbar from './component/Navbar/Navbar';
import Profile from './component/Profile/Profile';
import Dialogs from './component/Dialogs/Dialogs';


function App() {
  return (
    <div className='all_wrapper'>
      <Header />
      <div className='app_wrapper'>
        <Navbar />
        {/*<Profile />*/}
        <Dialogs />
      </div>
    </div>
  );
}

export default App;
