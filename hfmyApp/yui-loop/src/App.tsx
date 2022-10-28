import { WaitingPassengerType } from './types/WaitingPassengerType';
import { useState } from 'react';
import './App.css';
import WaitingPassengerArray from './WaitingPassengerArray';

function App() {
  const [waithingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
  
  const AddRecruitment = () => {
    setWaitingPassengers((prevWaitingPassengers) => {
      return [...prevWaitingPassengers, {message: '乗車相手を探しています'}]
    })
  };

  return (
    <div className="App">
      <h1>ひふみよ</h1>
      <p>YUI LOOP</p>
      <button onClick={AddRecruitment}>相乗り相手を募集する</button>
      <WaitingPassengerArray waitingPassengers={waithingPassengers} />
    </div>
  );
}

export default App;
