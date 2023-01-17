import { WaitingPassengerType } from '../types/WaitingPassengerType';
import React, { FC, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import deleteSchedule from "../functions/async/DeleteSchedule"

interface WaitingPassengerProps {
  waitingPassenger: WaitingPassengerType,
  id: number
}

const WaitingPassenger: FC<WaitingPassengerProps> = (props) => { 
  const wp = props.waitingPassenger;
  const appContext = useContext(AppContext);

  const handleDeleteSchedule = (id: string) => {
    deleteSchedule(id);
  };
  return (
    <>
      <div className="card">
        <br/>
        募集者：{wp.userName}<br/>
        出発時間：{wp.date}　{wp.time}<br/>
        出発場所：{wp.departurePlace}　→　到着場所：{wp.destination}<br/>
        定員：{wp.capacity}<br/>
        <p>備考：{wp.memo}</p><br/>
        {appContext.userName==wp.userName ? (
          <button onClick={()=>{
          appContext.deleteWaitingPassenger(props.id);
          handleDeleteSchedule(wp.id);
          }}>募集中止</button>
        ):(<></>)}
      </div>
    </>
  )
}
export default WaitingPassenger;