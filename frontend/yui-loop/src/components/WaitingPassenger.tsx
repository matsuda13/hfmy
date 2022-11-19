import { WaitingPassengerType } from '../types/WaitingPassengerType';
import React, { FC } from 'react'
import Item from './Item'
import { workerData } from 'worker_threads';

interface WaitingPassengerProps {
  waitingPassenger: WaitingPassengerType,
}

const WaitingPassenger: FC<WaitingPassengerProps> = (props) => { 
  const wp = props.waitingPassenger

  return (
    <>
      <Item month={wp.month} date={wp.date} start={wp.start} destination={wp.destination} time={wp.time} capacity={wp.capacity} />
    </>
  )
}

export default WaitingPassenger