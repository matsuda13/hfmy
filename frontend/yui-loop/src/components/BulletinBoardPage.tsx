<<<<<<< HEAD
import React, {FC, useState, useContext} from 'react'
=======
import React, {FC, useState, useEffect} from 'react'
>>>>>>> feature/database
import CarpoolModal from './CarpoolModal'
import WaitingPassengerArray from './WaitingPassengerArray'
import Modal from 'react-modal';
<<<<<<< HEAD
import { ScheduleContext } from '../contexts/ScheduleContext';
import { DeleteContext } from '../contexts/DeleteContext';
=======
import {getWaitingList, cards, Rows} from "../api"
import { createAdd } from 'typescript';

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

export const DeleteContext = React.createContext({} as {
    deleteWaitingPassenger: React.Dispatch<number>
})

>>>>>>> feature/database

const BulletinBoardPage:FC = () => {
    const scheduleContext = useContext(ScheduleContext);
    const deleteContext = useContext(DeleteContext);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
<<<<<<< HEAD
  
=======
    const [time, setTime] = useState("1限休み(10:00~10:10)");
    const [start, setStart] = useState("工学部駐車場");
    const [destination, setDestination] = useState("工学部駐車場");
    const [capacity, setCapacity] = useState("1");
    const [card, setCard] = useState<cards | null>(null);

    useEffect(()=>{
      getWaitingList().then((data) => {
        setCard(data);
      });
      if (card != null){
        console.log(card)
        if (card.rows != null){
          console.log(card.rows[0].id);
          console.log(card.rows[0].departurePlace);
          console.log(card.rows[0].destination);
        }
      }
    }, [])

>>>>>>> feature/database
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
<<<<<<< HEAD
                  <WaitingPassengerArray waitingPassengers={deleteContext.waitingPassengers} />
=======
                <DeleteContext.Provider value={{deleteWaitingPassenger}}>
                  <WaitingPassengerArray waitingPassengers={waithingPassengers} />
                </DeleteContext.Provider>
            </ScheduleContext.Provider>
            
>>>>>>> feature/database
        </>
    )
}

export default BulletinBoardPage