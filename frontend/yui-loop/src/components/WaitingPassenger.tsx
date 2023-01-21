import { WaitingPassengerType } from '../types/WaitingPassengerType';
import React, { FC, useContext, useState} from 'react';
import { AppContext } from '../contexts/AppContext';
import deleteSchedule from "../functions/async/DeleteSchedule";
import sendCarpoolRequest from '../functions/async/SendCarpoolRequest';
import { useNavigate } from 'react-router-dom';
import cancelCarpoolRequest from '../functions/async/CancelCarpoolRequest';

interface WaitingPassengerProps {
  waitingPassenger: WaitingPassengerType,
  id: number
}

const WaitingPassenger: FC<WaitingPassengerProps> = (props) => {
  const wp = props.waitingPassenger;
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const handleDeleteSchedule = (id: string) => {
    deleteSchedule(id);
  };

  const handleCarpoolRequestCancel = (id: string, userName: string) => {
    cancelCarpoolRequest(id, userName);
  }

  const handleCarpoolRequestButtonClick = (id: string, userName:string) => {
    console.log("現在の希望者：",wp.candidates)
    const n_req = wp.candidates.split(",").length
    const n_cap = Number(wp.capacity)
    console.log(n_cap, "vs" ,n_req-1)
    if (n_cap > n_req-1) {
      sendCarpoolRequest(id, userName);
    } else {
      console.log("定員を超えていますよ")
    }
  }
  return (
    <>
      <div className="card">
        <br/>
        募集者：{wp.userName}　性別：{wp.gender}　学年：{wp.grade}<br/>
        出発時間：{wp.date}　{wp.time}<br/>
        出発場所：{wp.departurePlace}　→　到着場所：{wp.destination}<br/>
        定員：{wp.capacity}<br/>
        乗りたい人：{wp.candidates}<br/>
        リクエスト済み？：{wp.isAlreadyRequested ? (<>true</>) : (<>false</>)}<br/>
        備考：{wp.memo}<br/>
        {appContext.userName==wp.userName ? (
          <button onClick={()=>{
          appContext.deleteWaitingPassenger(props.id);
          handleDeleteSchedule(wp.id);
          }}>募集中止</button>
        ):(wp.isAlreadyRequested==false ? (<button onClick={()=>{
          if(appContext.userName!=""){
            handleCarpoolRequestButtonClick(wp.id, appContext.userName);
          }else{
            navigate('/');
          }
        }}>相乗りリクエストを送信</button>
        ) : (<button onClick={()=>{
          if(appContext.userName!=""){
            handleCarpoolRequestCancel(wp.id, appContext.userName);
          }else{
            navigate('/');
          }
        }}>相乗りリクエストを取り消す</button>))}
      </div>
    </>
  )
}
export default WaitingPassenger;