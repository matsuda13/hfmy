import React, {FC, useContext} from 'react'
import WaitingPassenger from './WaitingPassenger'
import { WaitingPassengerType } from '../types/WaitingPassengerType'

interface WaitingPassengerArrayProps {
  waitingPassengers: Array<WaitingPassengerType>,
}

const WaitingPassengerArray: FC<WaitingPassengerArrayProps> = (props) => {
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