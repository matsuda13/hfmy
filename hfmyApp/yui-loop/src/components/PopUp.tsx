import { FC } from 'react'
import { useState } from 'react';

import { WaitingPassengerType } from '../types/WaitingPassengerType';
import WaitingPassengerArray from '../components/WaitingPassengerArray';



interface PopUpProps {
}

const PopUp: FC<PopUpProps> = () => {

  // ここでPopUpと、WaitingPassengerのStateを宣言
  const [waithingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
  const [isShowPopUp, setisShowPopUp] = useState(false);

  // ポップアップを表示させるハンドラ
  const handleShowButtunClick = () => {
    setisShowPopUp(true)
  }

  // ポップアップを閉じるハンドラ
  const handleCloseButtunClick = () => {
    setisShowPopUp(false)
  }

  // ここ、ちょっと聞きたい。
  const AddRecruitment = () => {
    setWaitingPassengers((prevWaitingPassengers) => {
      return (
        [...prevWaitingPassengers, {message: '募集を開始しました...'}]
        )
    })
  };

  return (
    <>
      <button onClick={handleShowButtunClick}>相乗り相手を募集する</button>
      <div>
        <div className={`popup-menu ${isShowPopUp ? 'shown' : ''}`}>
          <div className="popup-message">
            <div className='popup-select'>
              以下の内容を記入してください。
            <p>集合時刻</p>
              <select>
                <option>10:10</option>
                <option>12:40</option>
                <option>14:30</option>
              </select>
            <p>到着時刻</p>
              <select>
                <option>10:20</option>
                <option>12:50</option>
                <option>14:50</option>
              </select>
            <p>場所</p>
              <select>
                <option>工学部</option>
                <option>理学部</option>
                <option>農学部</option>
              </select>
            <p>乗車可能人数</p>
              <select>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <p>選択したら、下記のボタンをクリック</p>
              <div className='popup-buttun'>
              <button onClick={() => {
                  handleCloseButtunClick();
                  AddRecruitment();
                }}>
                この条件で募集する
                </button>
              </div>

            </div>
            
          </div>
        </div>
        <WaitingPassengerArray waitingPassengers={waithingPassengers} />
      </div>
    </>
  )
}

export default PopUp