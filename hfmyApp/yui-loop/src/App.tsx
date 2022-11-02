import { WaitingPassengerType } from './types/WaitingPassengerType';
import { useState } from 'react';
import './App.css';
import WaitingPassengerArray from './components/WaitingPassengerArray';
import Modal from 'react-modal';
import CarpoolModal from './components/CarpoolModal'
import Card from './components/Card'

function App() {
  const [waithingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
  const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
  
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
      <Modal isOpen={isCarpoolModalOpen}>
        <div className='CarpoolModal'>
          <CarpoolModal />
        </div>
        <div className='ConfirmButton'>
          <button onClick={() => {
            AddWaitingPassenger();
            
            CloseModal();
            }}>確定</button>
        </div>
      </Modal>
      <WaitingPassengerArray waitingPassengers={waithingPassengers} />
      <Card time={1} />
    </div>
  );
}

export default App;
