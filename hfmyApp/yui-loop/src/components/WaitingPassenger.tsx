import { WaitingPassengerType } from '../types/WaitingPassengerType';
import { FC } from 'react'

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