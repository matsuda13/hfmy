import React, { useContext, useEffect } from 'react';
import {Route, Router, Routes} from 'react-router-dom';
import { AppContext } from './contexts/AppContext';
import SignInPage from './components/SignInPage';
import signInWithJwt from './functions/async/SignInWithJwt';
import BulletinBoardPage from './components/BulletinBoardPage';
import './App.css';

function App() {
  const appContext = useContext(AppContext);
  useEffect(() => {
    signInWithJwt(appContext);
  }, []);
  return (
    <div className="wrapper">
        <h1>HFMY</h1>
        <p>YUI LOOP</p>
        <p>{appContext.isSignedIn ? (<p>こんにちは {appContext.userName} さん</p>):(<></>)}</p>
        <Routes>
          <Route path="/board" element={<BulletinBoardPage/>}></Route>
          <Route path="/" element={<SignInPage/>}></Route>
        </Routes>
    </div>
  );
}
export default App;
