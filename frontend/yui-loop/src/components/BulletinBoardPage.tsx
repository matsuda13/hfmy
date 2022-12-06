import React, {FC, useState, useContext, useEffect} from 'react';
import CarpoolModal from './CarpoolModal';
import WaitingPassengerArray from './WaitingPassengerArray';
import Modal from 'react-modal';
import { ScheduleContext } from '../contexts/ScheduleContext';
import { DeleteContext } from '../contexts/DeleteContext';
import { getWaitingList, cards, Rows } from '../api';

const BulletinBoardPage:FC = () => {
    const scheduleContext = useContext(ScheduleContext);
    const deleteContext = useContext(DeleteContext);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
  
    useEffect(()=>{
      getWaitingList().then((data)=>{
        if (data!=null){
          if (data.rows!=null){
            for (var i:number=0;i<2;i++) {
              console.log(data.rows[i].id);
              console.log(data.rows[i].date);
              console.log(data.rows[i].departurePlace);
              console.log(data.rows[i].destination);
              scheduleContext.setTime(data.rows[i].departureTime);
              scheduleContext.setStart(data.rows[i].departurePlace);
              scheduleContext.setDestination(data.rows[i].destination);
              scheduleContext.setCapacity(data.rows[i].capacity);
            }
          }
        }
        else{
          console.log("null?")
        }
      })
    }, []);

    useEffect(()=>{
      AddWaitingPassenger()
    },[scheduleContext.capacity])

    const AddWaitingPassenger = () => {
      const month = (new Date().getMonth()+1).toString()
      const date = new Date().getDate().toLocaleString()
      deleteContext.setWaitingPassengers(
        [
          ...deleteContext.waitingPassengers,
          {
            month:month,
            date:date,
            time:scheduleContext.time,
            start:scheduleContext.start,
            destination:scheduleContext.destination,
            capacity:scheduleContext.capacity
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
  
    const InitializeValue = () => {
      scheduleContext.setTime("1限休み(10:00~10:10)");
      scheduleContext.setStart("工学部駐車場");
      scheduleContext.setDestination("工学部駐車場");
      scheduleContext.setCapacity("1");
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
                            InitializeValue();
                            CloseModal();
                            }}>確定</button>
                    </div>
                </Modal>
                  <WaitingPassengerArray waitingPassengers={deleteContext.waitingPassengers} />
        </>
    )
}

export default BulletinBoardPage