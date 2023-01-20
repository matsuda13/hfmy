import React, {FC, useState, useContext, useEffect} from 'react'
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import DriverWantedModal from '../modals/DriverWantedModal';
import WaitingDriverArray from '../WaitingDriverArray';
import { AppContext } from '../../contexts/AppContext';
import postPassengerSchedule from '../../functions/async/PostPassengerSchedule';
import fetchPassengerSchedule from '../../functions/async/FetchPassengerSchedule';
import deleteExpiredSchedule from '../../functions/async/DeleteExpiredSchedule';

const DriverWantedPage:FC = () => {
    const appContext = useContext(AppContext);
    const [isDriverWantedModalOpen, setIsOpenDriverWantedModal] = useState(false);
    const openDriverWantedModal = () => { setIsOpenDriverWantedModal(true); InitializeDriverWantedModal(); };
    const closeDriverWantedModal = () => { setIsOpenDriverWantedModal(false); appContext.setIsErrorState(false); appContext.setNotMoveErrorMessage("");};
    const navigate = useNavigate();
    useEffect(() => {
      handleDeleteExpiredSchedule();
      handleFetchPassengerSchedule();
    }, [isDriverWantedModalOpen]);
    const navigateToHomePage = () => {
        navigate('/');
      };
    const navigateToPassengerWantedPage = () => {
        navigate('/passenger-wanted-page')
    }
    const AddWaitingDriver = () => {
      const id = appContext.id;
      const date = appContext.psDate;
      const time = appContext.psTimeToAdd;
      const departurePlace = appContext.psDeparturePlaceToAdd;
      const destination = appContext.psDestinationToAdd;
      const memo = appContext.psMemo;
      const userName = appContext.userName;
      const gender = appContext.gender;
      const grade = appContext.grade;
      if (appContext.waitingDrivers != null){
        appContext.setWaitingDrivers(
          [
            ...appContext.waitingDrivers,
            {
              id,
              date,
              time,
              departurePlace,
              destination,
              memo,
              userName,
              gender,
              grade,
            }
          ]
        )} else {
          appContext.setWaitingDrivers(
            [
              {
                id,
                date,
                time,
                departurePlace,
                destination,
                memo,
                userName,
                gender,
                grade,
              }
            ]
          )
        }
    };
    const InitializeDriverWantedModal = () => {
      appContext.setPsDate(new Date().toLocaleDateString());
      appContext.setPsTimeToAdd("1限休み(10:00~10:10)");
      appContext.setPsDeparturePlaceToAdd("工学部駐車場");
      appContext.setPsDestinationToAdd("工学部駐車場");
      appContext.setPsMemo("");
    };
    const handlePostPassengerSchedule = () => {
      postPassengerSchedule(appContext, appContext.psDate, appContext.psTimeToAdd, appContext.psDeparturePlaceToAdd, appContext.psDestinationToAdd, appContext.psMemo, appContext.userName, appContext.gender, appContext.grade);
    };
    const handleFetchPassengerSchedule = () => {
      fetchPassengerSchedule(appContext);
    };
    const handleDeleteExpiredSchedule = () => {
      deleteExpiredSchedule();
    };
    return (
        <>
            <button onClick={()=> {
              if(appContext.userName!=""){
                openDriverWantedModal();
              }else{
                navigateToHomePage();
                }}}>ドライバーを募集する</button>
            <button onClick={()=>{
              handleDeleteExpiredSchedule();
              handleFetchPassengerSchedule();}}>更新</button>
                <Modal
                  isOpen={isDriverWantedModalOpen}
                  ariaHideApp={false}
                >
                  <div className='CarpoolModal'>
                    <DriverWantedModal/>
                  </div>
                  <div className='ConfirmButton'>
                    <button onClick={()=>{
                      closeDriverWantedModal();
                    }}>中止</button>
                    <button onClick={() => {
                      if(appContext.psDeparturePlaceToAdd != appContext.psDestinationToAdd){
                        AddWaitingDriver();
                        handlePostPassengerSchedule();
                        closeDriverWantedModal();
                      } else {
                         appContext.setIsErrorState(true)
                         appContext.setNotMoveErrorMessage("出発地と目的地を異なる場所に変更してください。")
                      }
                    }}>確定</button>
                  </div>
                </Modal>
                <WaitingDriverArray waitingDrivers={appContext.waitingDrivers} />
                <button onClick={navigateToPassengerWantedPage}>乗客を募集する</button>
        </>
    )
}
export default DriverWantedPage;