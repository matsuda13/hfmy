import { WaitingPassengerType } from './types/WaitingPassengerType';
import {Route, Router, Routes} from 'react-router-dom'
import React, { useState } from 'react';
import './App.css';
import BulletinBoardPage from './components/BulletinBoardPage';
import SignInPage from './components/SignInPage';

function App() {

  return (
    <div className="App">
      <h1>HFMY</h1>
      <p>YUI LOOP</p>
      <Routes>
        <Route path="/board" element={<BulletinBoardPage/>}></Route>
        <Route path="/" element={<SignInPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
