import React, {FC, useState, useContext, useEffect} from 'react'
import CarpoolModal from './CarpoolModal'
import WaitingPassengerArray from './WaitingPassengerArray'
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';
import postSchedule from '../functions/async/PostSchedule'; 
import fetchSchedule from '../functions/async/FetchSchedule';
import LoginPage from './LoginPage'

const BulletinBoardPage:FC = () => {
    const appContext = useContext(AppContext);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);

    useEffect(() => {
      handleFetchSchedule();
    }, [isCarpoolModalOpen]);

    const Reload = () => {
      handleFetchSchedule()
    }

    const AddWaitingPassenger = () => {
      const id = appContext.id;
      const time = appContext.timeToAdd;
      const departurePlace = appContext.departurePlaceToAdd;
      const destination = appContext.destinationToAdd;
      const capacity = appContext.capacityToAdd;
      const memo = appContext.memo;
      const date = appContext.date
      if (appContext.waitingPassengers != null){
        appContext.setWaitingPassengers(
          [
            ...appContext.waitingPassengers,
            {
             id,
             date,
             time,
             departurePlace,
             destination,
             capacity,
             memo,
            }
        ]
      )}
      else{
        appContext.setWaitingPassengers(
          [
            {
             id,
             date,
             time,
             departurePlace,
             destination,
             capacity,
             memo,
            }
        ]
        )
      }
    };

    const InitializeModal = () => {
      appContext.setDate(new Date().toLocaleDateString())
      appContext.setMemo("")
      appContext.setTimeToAdd("1限休み(10:00~10:10)")
      appContext.setDeparturePlaceToAdd("工学部駐車場")
      appContext.setDestinationToAdd("工学部駐車場")
      appContext.setCapacityToAdd("1")
    }
  
    const OpenModal = () => {
      return (
        setIsOpenCarpoolModal(true),
        InitializeModal()
      )
    }
  
    const CloseModal = () => {
      return setIsOpenCarpoolModal(false)
    }

    const handlePostSchedule = () => {
      postSchedule(appContext, appContext.date, appContext.timeToAdd, appContext.departurePlaceToAdd, appContext.destinationToAdd, appContext.capacityToAdd, appContext.memo)
    }

    const handleFetchSchedule = () => {
      fetchSchedule(appContext)
    }
    return (
        <>
            <button onClick={OpenModal}>相乗り相手を募集する</button>
            <button onClick={Reload}>更新</button>
                <Modal isOpen={isCarpoolModalOpen}>
                    <div className='CarpoolModal'>
                        <CarpoolModal/>
                    </div>
                    <div className='ConfirmButton'>
                        <button onClick={() => {
                          if(appContext.departurePlaceToAdd != appContext.destinationToAdd){
                            AddWaitingPassenger();
                            handlePostSchedule();
                            CloseModal();
                            appContext.setIsErrorState(false)
                            appContext.setNotMoveErrorMessage("")
                          }else{
                            appContext.setIsErrorState(true)
                            appContext.setNotMoveErrorMessage("出発地と目的地を異なる場所に変更してください。")
                          }
                            }}>確定</button>
                        <button onClick={()=>{
                          CloseModal();
                          appContext.setIsErrorState(false)
                          appContext.setNotMoveErrorMessage("")
                          console.log(appContext.isErrorState)
                          console.log(appContext.notMoveErrorMessage)
                        }}>中止</button>
                    </div>
                </Modal>
                <WaitingPassengerArray waitingPassengers={appContext.waitingPassengers} />
        </>
    )
}

export default BulletinBoardPage