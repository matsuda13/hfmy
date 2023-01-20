import React, { useContext, useEffect } from 'react';
import {Route, Router, Routes} from 'react-router-dom';
import { AppContext } from './contexts/AppContext';
import SignInPage from './components/SignInPage';
import signInWithJwt from './functions/async/SignInWithJwt';
import BulletinBoardPage from './components/BulletinBoardPage';
import SignInTitle from './components/SignInTitle';
import SignInIntroduction from './components/SignInIntroduction';
import BoardTitle from './components/BoardTitle';
import './App.css';

function App() {
  const appContext = useContext(AppContext);
  useEffect(() => {
    signInWithJwt(appContext);
  }, []);
  return (
    <div className="wrapper">
      <div className="login-container"> 
        <Routes>
          <Route path="/board" element={<BoardTitle/>}></Route>
          <Route path="/" element={<SignInTitle/>}></Route>
        </Routes>
        <Routes>
          <Route path="/board" element={<BulletinBoardPage/>}></Route>
          <Route path="/" element={<SignInPage/>}></Route>
        </Routes>
        <Routes>
          <Route path="/" element={<SignInIntroduction/>}></Route>
        </Routes>
        </div>
    </div>
  );
}
export default App;
