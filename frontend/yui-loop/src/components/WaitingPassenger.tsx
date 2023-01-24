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
      setCapacityOverErrorMessage("これ以上乗れません!!")
    }
  };

  const handleFetchSchedule = () => {
    fetchSchedule(appContext);
  };

  return (
    <>
      <div className={appContext.userName==wp.userName?"my-card":"other-card"}>
        <br/>
        <p className='card-header'>
        ドライバー様：{wp.userName}さん　{wp.gender}　{wp.grade}<br/>
        時刻：{wp.date}　{wp.time}　定員：{wp.capacity}<br/>
        </p>
        <div className='card-place'>
        <p className='card-dep'>出発：<span className='green-line'>{wp.departurePlace}</span></p>
        <p className='card-arrow'>　→　</p>
        <p className='card-des'>到着：<span className='orange-line'>{wp.destination}</span></p></div>
        <div className='card-container'><p className='card-memo'>備考：{wp.memo}</p>
        {wp.candidates!="" ? (<div className='card-req'>乗りたい人：{wp.candidates}</div>) : (<div className='card-req'>乗りたい人：いない</div>)}</div>
        {appContext.userName==wp.userName ? (
          <button className='req-btn' onClick={()=>{
          appContext.deleteWaitingPassenger(props.id);
          handleDeleteSchedule(wp.id);
          }}>やっぱ乗せない</button>
        ):(wp.isAlreadyRequested==false ? (<button className='req-btn' onClick={()=>{
          if(appContext.userName!=""){
            handleCarpoolRequestButtonClick(wp.id, appContext.userName);
            handleFetchSchedule();
          }else{
            navigate('/');
          }
        }}>乗せてください!!</button>
        ) : (<button className='req-btn' onClick={()=>{
          if(appContext.userName!=""){
            handleCarpoolRequestCancel(wp.id, appContext.userName);
            handleFetchSchedule();
          }else{
            navigate('/');
          }
        }}>やっぱ乗らない</button>))}
        <div className="CapacityOverErrorMessage">{capacityOverErrorMessage}</div>
      </div>
    </>
  )
}
export default WaitingPassenger;