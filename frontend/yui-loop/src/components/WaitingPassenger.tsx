import React, { FC, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { WaitingPassengerType } from '../types/WaitingPassengerType';
import deletePassengerSchedule from '../functions/async/DeletePassengerSchedule';

interface WaitingPassengerProps {
  waitingPassenger: WaitingPassengerType,
  id: number
}

const WaitingPassenger: FC<WaitingPassengerProps> = (props) => { 
  const wp = props.waitingPassenger;
  const appContext = useContext(AppContext);

  const handleDeletePassengerSchedule = (id: string) => {
    deletePassengerSchedule(id);
  };
  return (
    <>
      <div className="card">
        <br/>
        募集者：{wp.userName}　性別：{wp.gender}　学年：{wp.grade}<br/>
        出発時間：{wp.date}　{wp.time}<br/>
        出発場所：{wp.departurePlace}　→　到着場所：{wp.destination}<br/>
        定員：{wp.capacity}<br/>
        備考：{wp.memo}<br/>
        {appContext.userName==wp.userName ? (
          <button onClick={()=>{
          appContext.deleteWaitingPassenger(props.id);
          handleDeletePassengerSchedule(wp.id);
          }}>募集中止</button>
        ):(<></>)}
      </div>
    </>
  )
}
export default WaitingPassenger;