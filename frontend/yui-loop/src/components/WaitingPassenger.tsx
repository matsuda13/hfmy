import { WaitingPassengerType } from '../types/WaitingPassengerType';
import React, { FC } from 'react'

interface WaitingPassengerProps {
  waitingPassenger: WaitingPassengerType,
}

const WaitingPassenger: FC<WaitingPassengerProps> = (props) => { 

  return (
    <>
      <div>
        {props.waitingPassenger.start}から{props.waitingPassenger.destination}
      </div>
    
    </>
  )
}

export default WaitingPassenger