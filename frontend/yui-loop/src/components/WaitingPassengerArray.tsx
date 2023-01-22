import React, {FC} from 'react'
import WaitingPassenger from './WaitingPassenger'
import { WaitingPassengerType } from '../types/WaitingPassengerType'

interface WaitingPassengerArrayProps {
  waitingPassengers: Array<WaitingPassengerType> | null,
}

const WaitingPassengerArray: FC<WaitingPassengerArrayProps> = (props) => {
  return (
    <div className="card-list">
      {props.waitingPassengers == null ? (<><br/>募集はありません</>):(
          props.waitingPassengers.map((waitingPassenger, id) => (
           <WaitingPassenger
                  waitingPassenger = {waitingPassenger}
                  key = {id}
                  id = {id}/>
        )))}
    </div>
  )
}
export default WaitingPassengerArray;