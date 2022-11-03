import { WaitingPassengerType } from './types/WaitingPassengerType';
import React, { useState } from 'react';
import './App.css';
import WaitingPassengerArray from './components/WaitingPassengerArray';
import Modal from 'react-modal';
import Card from "./components/Card"
import CarpoolModal from './components/CarpoolModal';

export const TimeContext = React.createContext({} as {
  time: string
  setTime: React.Dispatch<React.SetStateAction<string>>
})

function App() {
  const [waithingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
  const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
  const [time, setTime] = useState("");
  
  
  const AddWaitingPassenger = () => {
    setWaitingPassengers((prevWaitingPassengers) => {
      return [...prevWaitingPassengers, {message: '〇〇時に出発地〇〇から目的地〇〇への相乗り乗客を乗車可能人数〇〇人で募集しています'}]
    })
  };

  const OpenModal = () => {
    return setIsOpenCarpoolModal(true)
  }

  const CloseModal = () => {
    return setIsOpenCarpoolModal(false)
  }


  return (
    <div className="App">
      <h1>ひふみよ</h1>
      <p>YUI LOOP</p>
      <button onClick={OpenModal}>相乗り相手を募集する</button>
      <TimeContext.Provider value={{time, setTime}}>
        <Modal isOpen={isCarpoolModalOpen}>
          <div className='CarpoolModal'>
            <CarpoolModal/>
          </div>
          <div className='ConfirmButton'>
            <button onClick={() => {
              AddWaitingPassenger();
              
              CloseModal();
              }}>確定</button>
          </div>
        </Modal>
        <WaitingPassengerArray waitingPassengers={waithingPassengers} />
        <Card/>
      </TimeContext.Provider>
    </div>
  );
}

export default App;
