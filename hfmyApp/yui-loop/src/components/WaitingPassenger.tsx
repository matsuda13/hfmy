import { WaitingPassengerType } from '../types/WaitingPassengerType';
import React, { FC } from 'react'
import {TimeContext} from "../App"

interface WaitingPassengerProps {
  waitingPassenger: WaitingPassengerType,
  
}

const WaitingPassenger: FC<WaitingPassengerProps> = (props) => {
  return (
    <>
      <div>
        {props.waitingPassenger.message}
      </div>
    
    </>
  )
}

export default WaitingPassenger