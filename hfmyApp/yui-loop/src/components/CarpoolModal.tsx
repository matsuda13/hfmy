import React,{useState, useContext} from 'react'
import { TimeContext } from '../App';
import { setTokenSourceMapRange } from 'typescript';

const CarpoolModal = () => {
  const {time,setTime, departure, setDeparture, arrival, setArrival, capacity, setCapacity} = useContext(TimeContext);
  

  const SelectTime = (time:string) => {
    setTime(time);
  };

  const SelectDeparture = (departure: string) => {
    setDeparture(departure);
  }

  const SelectArrival = (arrival: string) => {
    setArrival(arrival);
  }

  const SelectCapacity = (capacity: string) => {
    setCapacity(capacity);
  }

  const month = (new Date().getMonth()+1).toString()

  const date = new Date().getDate().toLocaleString()

  return (
    <div>
        <p>日付:{month+'/'+date}</p>
        <p>募集条件を選択してください</p>
        <br />
        <p>出発時間</p>
        <select name="time" onChange={(e) => SelectTime(e.target.value)}>
          <option value="1限休み(10:00~10:10)">1限休み(10:00~10:10)</option>
          <option value="昼休み前半(11:50~12:00)">昼休み前半(11:50~12:00)</option>
          <option value="昼休み後半(12:30~12:40)">昼休み後半(12:30~12:40)</option>
          <option value="3限休み(14:20~14:30)">3限休み(14:20~14:30)</option>
        </select>
        <p>出発地</p>
        <select name="departurePlace" onChange={(e) => SelectDeparture(e.target.value)}>
          <option value="工学部駐車場">工学部駐車場</option>
          <option value="学生寮前駐車場">学生寮前駐車場</option>
          <option value="サークル棟駐車場">サークル棟駐車場</option>
          <option value="共通教育棟駐車場">共通教育棟駐車場</option>
          <option value="グラウンド駐車場">グラウンド駐車場</option>
          <option value="体育館前駐車場">体育館前駐車場</option>
          <option value="教育学部駐車場">教育学部駐車場</option>
          <option value="農学部駐車場">農学部駐車場</option>
          <option value="理学部駐車場">理学部駐車場</option>
        </select>
        <p>目的地</p>
        <select name="destination" onChange={(e) => SelectArrival(e.target.value)}>
          <option value="工学部駐車場">工学部駐車場</option>
          <option value="学生寮前駐車場">学生寮前駐車場</option>
          <option value="サークル棟駐車場">サークル棟駐車場</option>
          <option value="共通教育棟駐車場">共通教育棟駐車場</option>
          <option value="グラウンド駐車場">グラウンド駐車場</option>
          <option value="体育館前駐車場">体育館前駐車場</option>
          <option value="教育学部駐車場">教育学部駐車場</option>
          <option value="農学部駐車場">農学部駐車場</option>
          <option value="理学部駐車場">理学部駐車場</option>
        </select>
        <p>乗車可能人数</p>
        <select name="passengers" onChange={(e)=>SelectCapacity(e.target.value)}>
          <option value="1">1人</option>
          <option value="2">2人</option>
          <option value="3">3人</option>
          <option value="4">4人</option>
        </select>
    </div>
  )
}

export default CarpoolModal