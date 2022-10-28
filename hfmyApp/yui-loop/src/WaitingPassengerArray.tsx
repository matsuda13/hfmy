import React from 'react'
import WaitingPassenger from './WaitingPassenger'
import { WaitingPassengerType } from './types/WaitingPassengerType'
import { FC } from 'react'

interface WaitingPassengerArrayProps {
  waitingPassengers: Array<WaitingPassengerType>,
}

const WaitingPassengerArray: FC<WaitingPassengerArrayProps> = (props) => {
  return (
    <>
      {props.waitingPassengers.map((waitingPassenger, id) => (
        <WaitingPassenger waitingPassenger={waitingPassenger} key={id} />)
      )}
    </>
  )
}

export default WaitingPassengerArray