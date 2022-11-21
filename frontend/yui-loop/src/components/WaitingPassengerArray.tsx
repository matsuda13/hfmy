import React, {FC, useContext} from 'react'
import WaitingPassenger from './WaitingPassenger'
import { WaitingPassengerType } from '../types/WaitingPassengerType'

interface WaitingPassengerArrayProps {
  waitingPassengers: Array<WaitingPassengerType>,
}

export const CancelButtonContext = React.createContext({} as {
  cancelWaitingPassenger: React.Dispatch<number>
})

const WaitingPassengerArray: FC<WaitingPassengerArrayProps> = (props) => {
 
  const cancelWaitingPassenger = (id:number) => {
    console.log("id:"+id+"、キャンセルします")
    const list = props.waitingPassengers
    list.splice(id, 1)
  }

  return (
    <>
      <CancelButtonContext.Provider value={{cancelWaitingPassenger}}>
      {props.waitingPassengers.map((waitingPassenger, id) => (
        <WaitingPassenger
                  waitingPassenger={waitingPassenger}
                  key={id}
                  id = {id}/>)
      )}
      </CancelButtonContext.Provider>
    </>
  )
}

export default WaitingPassengerArray