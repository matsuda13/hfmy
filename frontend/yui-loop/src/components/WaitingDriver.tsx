import React, { FC, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { WaitingDriverType } from '../types/WaitingDriverType';
import deleteDriverSchedule from '../functions/async/DeleteDriverSchedule';

interface WaitingDriverProps {
  waitingDriver: WaitingDriverType,
  id: number
}

const WaitingDriver: FC<WaitingDriverProps> = (props) => { 
  const wp = props.waitingDriver;
  const appContext = useContext(AppContext);

  const handleDeleteDriverSchedule = (id: string) => {
    deleteDriverSchedule(id);
  };
  return (
    <>
      <div className="card">
        <br/>
        募集者：{wp.userName}　性別：{wp.gender}　学年：{wp.grade}<br/>
        出発時間：{wp.date}　{wp.time}<br/>
        出発場所：{wp.departurePlace}　→　到着場所：{wp.destination}<br/>
        備考：{wp.memo}<br/>
        {appContext.userName==wp.userName ? (
          <button onClick={()=>{
          appContext.deleteWaitingDriver(props.id);
          handleDeleteDriverSchedule(wp.id);
          }}>募集中止</button>
        ):(<></>)}
      </div>
    </>
  )
}
export default WaitingDriver;