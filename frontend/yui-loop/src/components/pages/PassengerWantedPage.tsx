import React, {FC, useState, useContext, useEffect} from 'react'
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import PassengerWantedModal from '../modals/PassengerWantedModal';
import WaitingPassengerArray from '../WaitingPassengerArray';
import { AppContext } from '../../contexts/AppContext';
import postDriverSchedule from '../../functions/async/PostDriverSchedule';
import fetchDriverSchedule from '../../functions/async/FetchDriverSchedule';
import deleteExpiredSchedule from '../../functions/async/DeleteExpiredSchedule';

const PassengerWantedPage:FC = () => {
    const appContext = useContext(AppContext);
    const [isPassengerWantedModalOpen, setIsOpenPassengerWantedModal] = useState(false);
    const openPassengerWantedModal = () => { setIsOpenPassengerWantedModal(true); InitializePassengerWantedModal(); };
    const closePassengerWantedModal = () => { setIsOpenPassengerWantedModal(false); appContext.setIsErrorState(false); appContext.setNotMoveErrorMessage("");};
    const navigate = useNavigate();
    useEffect(() => {
      handleDeleteExpiredSchedule();
      handleFetchDriverSchedule();
    }, [isPassengerWantedModalOpen]);
    const navigateToHomePage = () => {
      navigate('/');
    };
    const navigateToDriverWantedPage = () => {
      navigate('/driver-wanted-page');
    };
    const AddWaitingPassenger = () => {
      const id = appContext.id;
      const date = appContext.dsDate;
      const time = appContext.dsTimeToAdd;
      const departurePlace = appContext.dsDeparturePlaceToAdd;
      const destination = appContext.dsDestinationToAdd;
      const capacity = appContext.dsCapacityToAdd;
      const memo = appContext.dsMemo;
      const userName = appContext.userName;
      const gender = appContext.gender;
      const grade = appContext.grade;
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
              }
            ]
          )
        }
    };
    const InitializePassengerWantedModal = () => {
      appContext.setDsDate(new Date().toLocaleDateString());
      appContext.setDsTimeToAdd("1限休み(10:00~10:10)");
      appContext.setDsDeparturePlaceToAdd("工学部駐車場");
      appContext.setDsDestinationToAdd("工学部駐車場");
      appContext.setDsCapacityToAdd("1");
      appContext.setDsMemo("");
    };
    const handlePostDriverSchedule = () => {
      postDriverSchedule(appContext, appContext.dsDate, appContext.dsTimeToAdd, appContext.dsDeparturePlaceToAdd, appContext.dsDestinationToAdd, appContext.dsCapacityToAdd, appContext.dsMemo, appContext.userName, appContext.gender, appContext.grade);
    };
    const handleFetchDriverSchedule = () => {
      fetchDriverSchedule(appContext);
    };
    const handleDeleteExpiredSchedule = () => {
      deleteExpiredSchedule();
    };
    return (
        <>
            <button onClick={()=> {
              if(appContext.userName!=""){
                openPassengerWantedModal();
              }else{
                navigateToHomePage();
                }}}>乗客を募集する</button>
            <button onClick={()=>{
              handleDeleteExpiredSchedule();
              handleFetchDriverSchedule();}}>更新</button>
                <Modal
                  isOpen={isPassengerWantedModalOpen}
                  ariaHideApp={false}
                >
                  <div className='PassengerWantedModal'>
                    <PassengerWantedModal/>
                  </div>
                  <div className='ConfirmButton'>
                    <button onClick={()=>{
                      closePassengerWantedModal();
                    }}>中止</button>
                    <button onClick={() => {
                      if(appContext.dsDeparturePlaceToAdd != appContext.dsDestinationToAdd){
                        AddWaitingPassenger();
                        handlePostDriverSchedule();
                        closePassengerWantedModal();
                      } else {
                         appContext.setIsErrorState(true)
                         appContext.setNotMoveErrorMessage("出発地と目的地を異なる場所に変更してください。")
                      }
                    }}>確定</button>
                  </div>
                </Modal>
                <WaitingPassengerArray waitingPassengers={appContext.waitingPassengers} />
                <button onClick={navigateToDriverWantedPage}>ドライバーを募集する</button>
        </>
    )
}
export default PassengerWantedPage;