import React, {FC, useState, useContext, useEffect} from 'react'
import CarpoolModal from './CarpoolModal'
import WaitingPassengerArray from './WaitingPassengerArray'
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';
import postSchedule from '../functions/async/PostSchedule'; 
import fetchSchedule from '../functions/async/FetchSchedule';
import { useNavigate } from "react-router-dom";

const BulletinBoardPage:FC = () => {
    const appContext = useContext(AppContext);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
    const openCarpoolModal = () => { setIsOpenCarpoolModal(true); InitializeCarpoolModal(); };
    const closeCarpoolModal = () => { setIsOpenCarpoolModal(false); appContext.setIsErrorState(false); appContext.setNotMoveErrorMessage("");};
    const navigate = useNavigate();
    useEffect(() => {
      handleFetchSchedule();
    }, [isCarpoolModalOpen]);

    const AddWaitingPassenger = () => {
      const id = appContext.id;
      const time = appContext.timeToAdd;
      const departurePlace = appContext.departurePlaceToAdd;
      const destination = appContext.destinationToAdd;
      const capacity = appContext.capacityToAdd;
      const memo = appContext.memo;
      const date = appContext.date;
      const userName = appContext.userName;
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
              userName,
            }
          ]
        )} else {
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
                userName,
              }
            ]
          )
        }
    };
    const InitializeCarpoolModal = () => {
      appContext.setDate(new Date().toLocaleDateString());
      appContext.setMemo("");
      appContext.setTimeToAdd("1?????????(10:00~10:10)");
      appContext.setDeparturePlaceToAdd("??????????????????");
      appContext.setDestinationToAdd("??????????????????");
      appContext.setCapacityToAdd("1");
    };
    const handlePostSchedule = () => {
      postSchedule(appContext, appContext.date, appContext.timeToAdd, appContext.departurePlaceToAdd, appContext.destinationToAdd, appContext.capacityToAdd, appContext.memo, appContext.userName);
    };
    const handleFetchSchedule = () => {
      fetchSchedule(appContext);
    };
    return (
        <>
            <button onClick={()=> {
              if(appContext.userName!=""){
                openCarpoolModal()
              }else{
                navigate('/');
                }}}>??????????????????????????????</button>
            <button onClick={handleFetchSchedule}>??????</button>
                <Modal
                  isOpen={isCarpoolModalOpen}
                  ariaHideApp={false}
                >
                  <div className='CarpoolModal'>
                    <CarpoolModal/>
                  </div>
                  <div className='ConfirmButton'>
                    <button onClick={()=>{
                      closeCarpoolModal();
                    }}>??????</button>
                    <button onClick={() => {
                      if(appContext.departurePlaceToAdd != appContext.destinationToAdd){
                        AddWaitingPassenger();
                        handlePostSchedule();
                        closeCarpoolModal();
                      } else {
                         appContext.setIsErrorState(true)
                         appContext.setNotMoveErrorMessage("?????????????????????????????????????????????????????????????????????")
                      }
                    }}>??????</button>
                  </div>
                </Modal>
                <WaitingPassengerArray waitingPassengers={appContext.waitingPassengers} />
        </>
    )
}
export default BulletinBoardPage;