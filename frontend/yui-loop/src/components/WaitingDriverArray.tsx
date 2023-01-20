import React, {FC} from 'react'
import WaitingDriver from './WaitingDriver'
import { WaitingDriverType } from '../types/WaitingDriverType'

interface WaitingDriverArrayProps {
  waitingDrivers: Array<WaitingDriverType> | null,
}

const WaitingDriverArray: FC<WaitingDriverArrayProps> = (props) => {
  return (
    <>
      {props.waitingDrivers == null ? (<><br/>募集はありません</>):(
        props.waitingDrivers.map((waitingDriver, id) => (
        <WaitingDriver
                  waitingDriver = {waitingDriver}
                  key = {id}
                  id = {id}/>
        )))}
      {}
    </>
  )
}
export default WaitingDriverArray;