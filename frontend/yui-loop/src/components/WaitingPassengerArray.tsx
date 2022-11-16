import React, {FC, useContext} from 'react'
import WaitingPassenger from './WaitingPassenger'
import { WaitingPassengerType } from '../types/WaitingPassengerType'
import { ScheduleContext } from './BulletinBoardPage'
import { time } from 'console'

interface WaitingPassengerArrayProps {
  waitingPassengers: Array<WaitingPassengerType>,
}

const WaitingPassengerArray: FC<WaitingPassengerArrayProps> = (props) => {
  const {time, setTime, start, setStart, destination, setDestination, capacity, setCapacity} = useContext(ScheduleContext)
  
  return (
    <>
      {props.waitingPassengers.map((waitingPassenger, id) => (
        <WaitingPassenger
                  waitingPassenger={waitingPassenger}
                  key={id}/>)
      )}
    </>
  )
}

export default WaitingPassengerArray