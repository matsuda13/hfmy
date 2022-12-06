import React, {FC, useState, useEffect} from 'react'
import CarpoolModal from './CarpoolModal'
import WaitingPassengerArray from './WaitingPassengerArray'
import { WaitingPassengerType } from '../types/WaitingPassengerType';
import Modal from 'react-modal';
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


const BulletinBoardPage:FC = () => {
    const [waithingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
    const [isCarpoolModalOpen, setIsOpenCarpoolModal] = useState(false);
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

    const AddWaitingPassenger = () => {

      const month = (new Date().getMonth()+1).toString()
      const date = new Date().getDate().toLocaleString()
      setWaitingPassengers((prevWaitingPassengers) => {
        return [...prevWaitingPassengers, { month:month, date:date, time:time, start:start, destination:destination, capacity:capacity}]
      })
    };

    const deleteWaitingPassenger = (id:number) => {
        const list = waithingPassengers
        list.splice(id, 1)
        setWaitingPassengers((prevWaitingPassengers)=>{
            return [...prevWaitingPassengers]
        })
    }
  
    const OpenModal = () => {
      return setIsOpenCarpoolModal(true)
    }
  
    const CloseModal = () => {
      return setIsOpenCarpoolModal(false)
    }
  
    const InitializeValue = () => {
      setTime("1限休み(10:00~10:10)");
      setStart("工学部駐車場");
      setDestination("工学部駐車場");
      setCapacity("1");
    }
    return (
        <>
            <button onClick={OpenModal}>相乗り相手を募集する</button>
            <ScheduleContext.Provider value={{time, setTime, start, setStart, destination, setDestination, capacity, setCapacity}}>
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
                <DeleteContext.Provider value={{deleteWaitingPassenger}}>
                  <WaitingPassengerArray waitingPassengers={waithingPassengers} />
                </DeleteContext.Provider>
            </ScheduleContext.Provider>
            
        </>
    )
}

export default BulletinBoardPage