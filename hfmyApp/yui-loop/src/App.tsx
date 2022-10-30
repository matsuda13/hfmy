import { WaitingPassengerType } from './types/WaitingPassengerType';
import { useState } from 'react';
import './App.css';
import WaitingPassengerArray from './components/WaitingPassengerArray';
import PopUp from './components/PopUp';

function App() {


  return (
    <div className="App">
      <h1>ひふみよ</h1>
      <p>YUI LOOP</p>
      <div className="popup-menu-container">
        <PopUp />
      </div>
    </div>
  );
}

export default App;
