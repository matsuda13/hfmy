import React, {FC, useState, useEffect} from 'react'
import WaitingPassenger from './WaitingPassenger'
import { WaitingPassengerType } from '../types/WaitingPassengerType'
import {getWaitingList} from '../api'

interface WaitingPassengerArrayProps {
  waitingPassengers: Array<WaitingPassengerType>,
}





const WaitingPassengerArray: FC<WaitingPassengerArrayProps> = (props) => {
  const [list, setList] = useState();

  /**
  useEffect(() => {
    getWaitingList().then((data)=>{
      setList(data);
    })
  })
  */

  return (
    <>
      {props.waitingPassengers.map((waitingPassenger, id) => (
        <WaitingPassenger
                  waitingPassenger={waitingPassenger}
                  key={id}
                  id = {id}/>
        ))}
    </>
  )
}

export default WaitingPassengerArray