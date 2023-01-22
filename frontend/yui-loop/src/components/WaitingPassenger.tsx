import { WaitingPassengerType } from '../types/WaitingPassengerType';
import React, { FC, useContext, useState} from 'react';
import { AppContext } from '../contexts/AppContext';
import deleteSchedule from "../functions/async/DeleteSchedule";
import fetchSchedule from '../functions/async/FetchSchedule';
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
  const [capacityOverErrorMessage, setCapacityOverErrorMessage] = useState<string>("")

  const handleDeleteSchedule = (id: string) => {
    deleteSchedule(id);
  };

  const handleCarpoolRequestCancel = (id: string, userName: string) => {
    cancelCarpoolRequest(id, userName);
  };

  const handleCarpoolRequestButtonClick = (id: string, userName:string) => {
    const n_req = wp.candidates.split("さん\n").length
    const n_cap = Number(wp.capacity)
    if (n_cap > n_req-1) {
      sendCarpoolRequest(id, userName);
    } else {
      setCapacityOverErrorMessage("定員を超えています")
    }
  };

  const handleFetchSchedule = () => {
    fetchSchedule(appContext);
  };

  return (
    <>
      <div className="card">
        <br/>
        募集者：{wp.userName}　性別：{wp.gender}　学年：{wp.grade}<br/>
        出発時間：{wp.date}　{wp.time}<br/>
        出発場所：{wp.departurePlace}　→　到着場所：{wp.destination}<br/>
        定員：{wp.capacity}<br/>
        {wp.candidates!="" ? (<>乗りたい人：{wp.candidates}</>) : (<>相乗りリクエストなし</>)}<br/>
        備考：{wp.memo}<br/>
        {appContext.userName==wp.userName ? (
          <button onClick={()=>{
          appContext.deleteWaitingPassenger(props.id);
          handleDeleteSchedule(wp.id);
          }}>募集中止</button>
        ):(wp.isAlreadyRequested==false ? (<button onClick={()=>{
          if(appContext.userName!=""){
            handleCarpoolRequestButtonClick(wp.id, appContext.userName);
            handleFetchSchedule();
          }else{
            navigate('/');
          }
        }}>相乗りリクエストを送信</button>
        ) : (<button onClick={()=>{
          if(appContext.userName!=""){
            handleCarpoolRequestCancel(wp.id, appContext.userName);
            handleFetchSchedule();
          }else{
            navigate('/');
          }
        }}>相乗りリクエストを取り消す</button>))}
        <div className="CapacityOverErrorMessage">{capacityOverErrorMessage}</div>
      </div>
    </>
  )
}
export default WaitingPassenger;