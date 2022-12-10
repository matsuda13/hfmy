import React, {FC} from "react"
import {Rows} from "../api"

const WaitingPassengerCard:FC<Rows> = (row) => {
    return (
        <>
        {row.date}<br/>
        {row.departureTime}<br/>
        {row.departurePlace}<br/>
        {row.destination}<br/>
        {row.capacity}<br/>
        </>
    )
}

export default WaitingPassengerCard;