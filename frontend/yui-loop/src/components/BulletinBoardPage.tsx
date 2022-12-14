import React, {FC, useState, useContext, useEffect} from 'react'
import CarpoolModal from './CarpoolModal'
import WaitingPassengerArray from './WaitingPassengerArray'
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';
import postSchedule from '../functions/async/PostSchedule'; 
import fetchSchedule from '../functions/async/FetchSchedule';

const BulletinBoardPage:FC = () => {
    const appContext = useContext(AppContext);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
    const month = (new Date().getMonth()+1).toString();
    const date = new Date().getDate().toLocaleString();
    useEffect(() => {handleFetchSchedule()}, [isCarpoolModalOpen]);

    const AddWaitingPassenger = () => {
      const time = appContext.timeToAdd;
      const departurePlace = appContext.departurePlaceToAdd;
      const destination = appContext.destinationToAdd;
      const capacity = appContext.capacityToAdd;
      appContext.setWaitingPassengers(
        [
          ...appContext.waitingPassengers,
          {
            month,
            date,
            time,
            departurePlace,
            destination,
            capacity
          }
        ]
      )
    };
  
    const OpenModal = () => {
      return setIsOpenCarpoolModal(true)
    }
  
    const CloseModal = () => {
      return setIsOpenCarpoolModal(false)
    }

    const handlePostSchedule = () => {
      postSchedule(appContext, month, date, appContext.timeToAdd, appContext.departurePlaceToAdd, appContext.destinationToAdd, appContext.capacityToAdd)
    }

    const handleFetchSchedule = () => {
      fetchSchedule(appContext)
    }
    return (
        <>
            <button onClick={OpenModal}>相乗り相手を募集する</button>
                <Modal isOpen={isCarpoolModalOpen}>
                    <div className='CarpoolModal'>
                        <CarpoolModal/>
                    </div>
                    <div className='ConfirmButton'>
                        <button onClick={() => {
                            AddWaitingPassenger();
                            handlePostSchedule();
                            CloseModal();
                            }}>確定</button>
                        <button onClick={()=>{
                          CloseModal();
                        }}>中止</button>
                    </div>
                </Modal>
                <WaitingPassengerArray waitingPassengers={appContext.waitingPassengers} />
        </>
    )
}

export default BulletinBoardPage