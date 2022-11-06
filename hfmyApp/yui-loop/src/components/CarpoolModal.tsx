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

  return (
    <div>
        <p>募集条件を選択してください</p>
        <br />
        <p>時間</p>
        <select name="time" onChange={(e) => SelectTime(e.target.value)}>
          <option value="breakTime1">1限休み(10:00~10:10)</option>
          <option value="breakTime2-1">2限休み前半(11:50~12:00)</option>
          <option value="breakTime2-2">2限休み後半(12:30~12:40)</option>
          <option value="breakTime3">3限休み(14:20~14:30)</option>
        </select>
        <p>出発地</p>
        <select name="departurePlace" onChange={(e) => SelectDeparture(e.target.value)}>
          <option value="engineering">工学部駐車場</option>
          <option value="ryo">学生寮前駐車場</option>
          <option value="circle">サークル棟駐車場</option>
          <option value="kyotu">共通教育棟駐車場</option>
          <option value="ground">グラウンド駐車場</option>
          <option value="taiiku">体育館前駐車場</option>
          <option value="kyoiku">教育学部駐車場</option>
          <option value="agriculture">農学部駐車場</option>
          <option value="science">理学部駐車場</option>
        </select>
        <p>目的地</p>
        <select name="destination" onChange={(e) => SelectArrival(e.target.value)}>
          <option value="engineering">工学部駐車場</option>
          <option value="ryo">学生寮前駐車場</option>
          <option value="circle">サークル棟駐車場</option>
          <option value="kyotu">共通教育棟駐車場</option>
          <option value="ground">グラウンド駐車場</option>
          <option value="taiiku">体育館前駐車場</option>
          <option value="kyoiku">教育学部駐車場</option>
          <option value="agriculture">農学部駐車場</option>
          <option value="science">理学部駐車場</option>
        </select>
        <p>乗車可能人数</p>
        <select name="passengers" onChange={(e)=>SelectCapacity(e.target.value)}>
          <option value="onePerson">1人</option>
          <option value="twoPerson">2人</option>
          <option value="threePerson">3人</option>
          <option value="fourPerson">4人</option>
        </select>
    </div>
  )
}

export default CarpoolModal