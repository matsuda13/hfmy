import { WaitingPassengerType } from '../types/WaitingPassengerType';
import React, { FC, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

interface WaitingPassengerProps {
  waitingPassenger: WaitingPassengerType,
  id: number
}

const WaitingPassenger: FC<WaitingPassengerProps> = (props) => { 
  const wp = props.waitingPassenger
  const appContext = useContext(AppContext)

  return (
    <>
      <div>
        <br/>
        出発時間：{wp.month}/{wp.date}　{wp.time}<br/>
        出発場所：{wp.departurePlace}　→　到着場所：{wp.destination}<br/>
        定員：{wp.capacity}<br/>
        備考：{wp.memo}<br/>
        <button onClick={()=>{appContext.deleteWaitingPassenger(props.id)}}>募集中止</button>
      </div>
    </>
  )
}

export default WaitingPassenger