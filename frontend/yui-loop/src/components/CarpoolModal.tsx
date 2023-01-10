import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React,{ ChangeEvent, useContext } from 'react'
import { AppContext } from '../contexts/AppContext';

const CarpoolModal = () => {
  const appContext = useContext(AppContext);

  const selectTime = (event: ChangeEvent<HTMLSelectElement>) => {
    appContext.setTimeToAdd(event.target.value);
  };
  const selectDeparturePlace = (event: ChangeEvent<HTMLSelectElement>) => {
    appContext.setDeparturePlaceToAdd(event.target.value);
  };
  const selectDestination = (event: ChangeEvent<HTMLSelectElement>) => {
    appContext.setDestinationToAdd(event.target.value);
  };
  const selectCapacity = (event: ChangeEvent<HTMLSelectElement>) => {
    appContext.setCapacityToAdd(event.target.value);
  };
  const onInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    appContext.setMemo(event.target.value);
  };
  return (
    <div>
        <p>日付:
        <DatePicker dateFormat="yyyy/MM/dd" value={appContext.date}
        minDate={new Date()}
        onChange={(date) => {
                      date &&
                      appContext.setDate(date.toLocaleDateString())
                }}/>
        </p>
        <p>募集条件を選択してください</p>
        <br />
        <p>出発時間</p>
        <select name="time" onChange={selectTime}>
          <option value="1限休み(10:00~10:10)">1限休み(10:00~10:10)</option>
          <option value="昼休み前半(11:50~12:00)">昼休み前半(11:50~12:00)</option>
          <option value="昼休み後半(12:30~12:40)">昼休み後半(12:30~12:40)</option>
          <option value="3限休み(14:20~14:30)">3限休み(14:20~14:30)</option>
        </select>
        <p>出発地</p>
        <select name="departurePlace" onChange={selectDeparturePlace}>
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
        <select name="destination" onChange={selectDestination}>
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
        <select name="capacity" onChange={selectCapacity}>
          <option value="1">1人</option>
          <option value="2">2人</option>
          <option value="3">3人</option>
          <option value="4">4人</option>
        </select>
        <p>備考欄</p>
          <textarea id="memo" onChange={onInput}></textarea>
        <p>{appContext.isErrorState ? (<>{appContext.notMoveErrorMessage}</>):(<></>)}</p>
    </div>
  )
}
export default CarpoolModal;