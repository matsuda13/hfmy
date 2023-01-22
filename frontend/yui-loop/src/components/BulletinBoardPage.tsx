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
    return (
        <>  
          <div className='add-reload-btns'>
            <button className="menue-btn" onClick={()=> {
                if(appContext.userName!=""){
                  openCarpoolModal()
                }else{
                  navigate('/');
                  }}}><span>募集してみる</span></button>

            <button className="menue-btn" onClick={()=>{
            handleFetchSchedule();
            handleDeleteExpiredSchedule();
            }}><span>更新</span></button>
          </div>
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
                    }}>中止</button>
                    <button onClick={() => {
                      if(appContext.departurePlaceToAdd != appContext.destinationToAdd){
                        AddWaitingPassenger();
                        handlePostSchedule();
                        closeCarpoolModal();
                      } else {
                         appContext.setIsErrorState(true)
                         appContext.setNotMoveErrorMessage("出発地と目的地を異なる場所に変更してください。")
                      }
                    }}>確定</button>
                  </div>
                </Modal>
                <br/>

                {appContext.userName!=""?(sw ? (<WaitingPassengerArray waitingPassengers={appContext.waitingPassengers} />):(<button className="menue-btn" onClick={()=>{fetchSchedule(appContext);setSw(true)}}><span>YUILOOP掲示板を開く</span></button>)):(<></>)}
        </>
    )
}
export default BulletinBoardPage;