import { WaitingPassengerType } from './types/WaitingPassengerType';
import React, { useState } from 'react';
import './App.css';
import WaitingPassengerArray from './components/WaitingPassengerArray';
import Modal from 'react-modal';
import CarpoolModal from './components/CarpoolModal';

export const TimeContext = React.createContext({} as {
  time: string
  setTime: React.Dispatch<React.SetStateAction<string>>
  departure: string
  setDeparture: React.Dispatch<React.SetStateAction<string>>
  arrival: string
  setArrival: React.Dispatch<React.SetStateAction<string>>
  capacity: string
  setCapacity: React.Dispatch<React.SetStateAction<string>>
})

function App() {
  const [waithingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
  const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
  const [time, setTime] = useState("breakTime1");
  const [departure, setDeparture] = useState("engineering");
  const [arrival, setArrival] = useState("engineering");
  const [capacity, setCapacity] = useState("onePerson");
  
  const AddWaitingPassenger = () => {
    setWaitingPassengers((prevWaitingPassengers) => {
      return [...prevWaitingPassengers, {message: time+'に出発地'+departure+'から目的地'+arrival+'への相乗り乗客を乗車可能人数'+capacity+'人で募集しています'}]
    })
  };

  const OpenModal = () => {
    return setIsOpenCarpoolModal(true)
  }

  const CloseModal = () => {
    return setIsOpenCarpoolModal(false)
  }

  const InitializeValue = () => {
    setTime("breakTime1");
    setDeparture("engineering");
    setArrival("engineering");
    setCapacity("onePerson");
  }

  return (
    <div className="App">
      <h1>ひふみよ</h1>
      <p>YUI LOOP</p>
      <button onClick={OpenModal}>相乗り相手を募集する</button>
      <TimeContext.Provider value={{time, setTime, departure, setDeparture, arrival, setArrival, capacity, setCapacity}}>
        <Modal isOpen={isCarpoolModalOpen}>
          <div className='CarpoolModal'>
            <CarpoolModal/>
          </div>
          <div className='ConfirmButton'>
            <button onClick={() => {
              AddWaitingPassenger();
              InitializeValue();
              CloseModal();
              }}>確定</button>
          </div>
        </Modal>
        <WaitingPassengerArray waitingPassengers={waithingPassengers} />
      </TimeContext.Provider>
    </div>
  );
}

export default App;
