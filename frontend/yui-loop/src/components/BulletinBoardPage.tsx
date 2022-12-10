import React, {FC, useState, useContext, useEffect} from 'react';
import CarpoolModal from './CarpoolModal';
import WaitingPassengerArray from './WaitingPassengerArray';
import Modal from 'react-modal';
import WaitingPassengerCard from "./WaitingPassengerCard"
import { ScheduleContext } from '../contexts/ScheduleContext';
import { DeleteContext } from '../contexts/DeleteContext';
import { getWaitingList, cards, Rows, postWaitingCard } from '../api';

const BulletinBoardPage:FC = () => {
    const scheduleContext = useContext(ScheduleContext);
    const deleteContext = useContext(DeleteContext);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
    const [card, setCard] = useState<cards | null>(null);

    const update = () => {
      getWaitingList().then((data)=>{
        if (data!=null){
          if (data.rows!=null){
            setCard(data);
          }}
        })
    }
  
    useEffect(()=>{
      update();
    }, []);

    const AddWaitingPassenger = (time:string,start:string, destination:string, capacity:string) => {
      const month = (new Date().getMonth()+1).toString()
      const date = new Date().getDate().toLocaleString()
      deleteContext.setWaitingPassengers(
        [
          ...deleteContext.waitingPassengers,
          {
            month:month,
            date:date,
            time:time,
            start:start,
            destination:destination,
            capacity:capacity
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
                            const Addcard: Rows = {
                              id:0,
                              userId: 0,
                              date: "",
                              departureTime: scheduleContext.time,
                              departurePlace: scheduleContext.start,
                              destination: scheduleContext.destination,
                              capacity: scheduleContext.capacity,
                            };
                            postWaitingCard(Addcard).then((res)=>{
                              console.log(res);
                            });
                            AddWaitingPassenger(scheduleContext.time,
                                                scheduleContext.start,
                                                scheduleContext.destination,
                                                scheduleContext.capacity);
                            InitializeValue();
                            update();
                            CloseModal();
                            }}>確定</button>
                    </div>
                </Modal>
                <div className="cardblock">
                  {card == null ? (<></>) : (
                    card.rows == null ? (<></>) : (
                      card.rows.map((c, id)=>{
                        return (
                        <WaitingPassengerCard key={id} id={c.id} userId={c.userId} date={c.date}
                                              departureTime={c.departureTime} departurePlace={c.departurePlace}
                                              destination={c.destination} capacity={c.capacity}/>
                        )
                      })
                    )
                  )}
                </div>
                  <WaitingPassengerArray waitingPassengers={deleteContext.waitingPassengers} />
        </>
    )
}

export default BulletinBoardPage