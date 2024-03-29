import React, {FC, useState, useContext, useEffect} from 'react'
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import CarpoolModal from './CarpoolModal'
import WaitingPassengerArray from './WaitingPassengerArray'
import { AppContext } from '../contexts/AppContext';
import postSchedule from '../functions/async/PostSchedule'; 
import fetchSchedule from '../functions/async/FetchSchedule';
import deleteExpiredSchedule from '../functions/async/DeleteExpiredSchedule';

const BulletinBoardPage:FC = () => {
    const appContext = useContext(AppContext);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
    const [sw, setSw] = useState<boolean>(false);
    const openCarpoolModal = () => { setIsOpenCarpoolModal(true); InitializeCarpoolModal(); };
    const closeCarpoolModal = () => { setIsOpenCarpoolModal(false); appContext.setIsErrorState(false); appContext.setNotMoveErrorMessage("");};
    const navigate = useNavigate();
    useEffect(() => {
      handleDeleteExpiredSchedule();
      handleFetchSchedule();
    }, [isCarpoolModalOpen]);

    const AddWaitingPassenger = () => {
      const id = appContext.id;
      const date = appContext.date;
      const time = appContext.timeToAdd;
      const departurePlace = appContext.departurePlaceToAdd;
      const destination = appContext.destinationToAdd;
      const capacity = appContext.capacityToAdd;
      const memo = appContext.memo;
      const userName = appContext.userName;
      const gender = appContext.gender;
      const grade = appContext.grade;
      const candidates = appContext.candidates;
      const isAlreadyRequested = false;
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
              gender,
              grade,
              candidates,
              isAlreadyRequested
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
                gender,
                grade,
                candidates,
                isAlreadyRequested
              }
            ]
          )
        }
    };
    const InitializeCarpoolModal = () => {
      appContext.setDate(new Date().toLocaleDateString());
      appContext.setTimeToAdd("1限休み(10:00~10:10)");
      appContext.setDeparturePlaceToAdd("工学部駐車場");
      appContext.setDestinationToAdd("工学部駐車場");
      appContext.setCapacityToAdd("1");
      appContext.setMemo("");
    };
    const handlePostSchedule = () => {
      postSchedule(appContext, appContext.date, appContext.timeToAdd, appContext.departurePlaceToAdd, appContext.destinationToAdd, appContext.capacityToAdd, appContext.memo, appContext.userName, appContext.gender, appContext.grade);
    };
    const handleFetchSchedule = () => {
      fetchSchedule(appContext);
      
    };
    const handleDeleteExpiredSchedule = () => {
      deleteExpiredSchedule();
    };
    const navigateToHomePage = () => {
      navigate('/');
    };
    return (
        <>  
          <div className='top-btn'>
            <button className='reload-btn' onClick={handleFetchSchedule}></button>
            <button className='home-btn' onClick={navigateToHomePage}>Home</button></div>
              {isCarpoolModalOpen ? <></>:
              <button className='add-btn' onClick={()=> {
                  if(appContext.userName!=""){
                    openCarpoolModal();
                  }else{
                    navigateToHomePage();
                    }}}></button>
                  }
                <Modal
                  className='CarpoolModal'
                  overlayClassName="overlay"
                  isOpen={isCarpoolModalOpen}
                  ariaHideApp={false}
                >
                  <CarpoolModal/>
                  <div className='ConfirmButton'>
                    <button className='cancel-btn' onClick={()=>{
                      closeCarpoolModal();
                    }}>募集しない</button>
                    <button className='decision-btn' onClick={() => {
                      if(appContext.departurePlaceToAdd != appContext.destinationToAdd){
                        AddWaitingPassenger();
                        handlePostSchedule();
                        closeCarpoolModal();
                      } else {
                         appContext.setIsErrorState(true)
                         appContext.setNotMoveErrorMessage("出発地と目的地を異なる場所に変更してください。")
                      }
                    }}>これでOK!!</button>
                  </div>
                </Modal>
                <br/>
                {appContext.userName!=""?(sw ? (<WaitingPassengerArray waitingPassengers={appContext.waitingPassengers} />):(<button className="menue-btn" onClick={()=>{fetchSchedule(appContext);setSw(true)}}><span>掲示板を開く</span></button>)):(<></>)}
        </>
    )
}
export default BulletinBoardPage;