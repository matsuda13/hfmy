import React, { useContext, useEffect } from 'react';
import {Route, Router, Routes} from 'react-router-dom';
import { AppContext } from './contexts/AppContext';
import signInWithJwt from './functions/async/SignInWithJwt';
import SignInPage from './components/pages/SignInPage';
import PassengerWantedPage from './components/pages/PassengerWantedPage';
import DriverWantedPage from './components/pages/DriverWantedPage';
import './App.css';

function App() {
  const appContext = useContext(AppContext);
  useEffect(() => {
    signInWithJwt(appContext);
  }, []);
  return (
    <div className="App">
      <h1>HFMY</h1>
      <p>YUI LOOP</p>
      <p>{appContext.isSignedIn ? (<p>こんにちは {appContext.userName} さん</p>):(<p>ログインしてください</p>)}</p>
      <Routes>
        <Route path="/" element={<SignInPage/>}></Route>
        <Route path="/passenger-wanted-page" element={<PassengerWantedPage/>}></Route>
        <Route path="/driver-wanted-page" element={<DriverWantedPage/>}></Route>
      </Routes>
    </div>
  );
}
export default App;
