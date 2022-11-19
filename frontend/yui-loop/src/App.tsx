import { WaitingPassengerType } from './types/WaitingPassengerType';
import React, { useState } from 'react';
import './App.css';
import BulletinBoardPage from './components/BulletinBoardPage';

function App() {

  return (
    <div className="App">
      <h1>HFMY</h1>
      <p>YUI LOOP</p>
      <BulletinBoardPage/>
    </div>
  );
}

export default App;
