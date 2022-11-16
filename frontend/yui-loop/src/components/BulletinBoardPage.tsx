import React, {FC, useState, useContext} from 'react'
import CarpoolModal from './CarpoolModal'
import WaitingPassengerArray from './WaitingPassengerArray'
import { WaitingPassengerType } from '../types/WaitingPassengerType';
import Modal from 'react-modal';

export const ScheduleContext = React.createContext({} as {
    time: string
    setTime: React.Dispatch<React.SetStateAction<string>>
    start: string
    setStart: React.Dispatch<React.SetStateAction<string>>
    destination: string
    setDestination: React.Dispatch<React.SetStateAction<string>>
    capacity: string
    setCapacity: React.Dispatch<React.SetStateAction<string>>
  })

const BulletinBoardPage:FC = () => {
    const [waithingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
    const [time, setTime] = useState("1限休み(10:00~10:10)");
    const [start, setStart] = useState("工学部駐車場");
    const [destination, setDestination] = useState("工学部駐車場");
    const [capacity, setCapacity] = useState("1");
  
    const AddWaitingPassenger = () => {
      const month = (new Date().getMonth()+1).toString()
  
      const date = new Date().getDate().toLocaleString()
      setWaitingPassengers((prevWaitingPassengers) => {
        return [...prevWaitingPassengers, { month:month, date:date, time:time, start:start, destination:destination, capacity:capacity}]
      })
    };
  
    const OpenModal = () => {
      return setIsOpenCarpoolModal(true)
    }
  
    const CloseModal = () => {
      return setIsOpenCarpoolModal(false)
    }
  
    const InitializeValue = () => {
      setTime("1限休み(10:00~10:10)");
      setStart("工学部駐車場");
      setDestination("工学部駐車場");
      setCapacity("1");
    }
    return (
        <>
            <button onClick={OpenModal}>相乗り相手を募集する</button>
            <ScheduleContext.Provider value={{time, setTime, start, setStart, destination, setDestination, capacity, setCapacity}}>
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
            </ScheduleContext.Provider>
        </>
    )
}

export default BulletinBoardPage