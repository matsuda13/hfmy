import React from 'react'

const CarpoolModal = () => {
  return (
    <div>
        <p>募集条件を選択してください</p>
        <br />
        <p>時間</p>
        <select name="time">
          <option value="breakTime1">1限休み(10:00~10:20)</option>
          <option value="breakTime2">2限休み(11:50~12:50)</option>
          <option value="breakTime3">3限休み(14:20~14:40)</option>
        </select>
        <p>出発地</p>
        <select name="departurePlace">
          <option value="engineering">工学部駐車場</option>
          <option value="agriculture">農学部駐車場</option>
          <option value="science">理学部駐車場</option>
        </select>
        <p>目的地</p>
        <select name="destination">
          <option value="engineering">共通教育棟駐車場</option>
          <option value="agriculture">理学部駐車場</option>
          <option value="science">グラウンド駐車場</option>
        </select>
        <p>乗車可能人数</p>
        <select name="passengers">
          <option value="onePerson">1人</option>
          <option value="twoPerson">2人</option>
          <option value="threePerson">3人</option>
        </select>
    </div>
  )
}

export default CarpoolModal