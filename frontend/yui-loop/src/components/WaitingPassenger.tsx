import { WaitingPassengerType } from '../types/WaitingPassengerType';
import React, { FC } from 'react'

interface WaitingPassengerProps {
  waitingPassenger: WaitingPassengerType,
}

const WaitingPassenger: FC<WaitingPassengerProps> = (props) => { 
  const wp = props.waitingPassenger

  return (
    <>
      <div>
        <br/>
        日時：{wp.month}/{wp.date}<br/>
        出発場所：{wp.start}　→　到着場所：{wp.destination}<br/>
        出発時間：{wp.time}<br/>
        定員：{wp.capacity}
      </div>
    
    </>
  )
}

export default WaitingPassenger