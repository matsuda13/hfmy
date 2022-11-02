import react, {FC, useState} from "react"
import WaitingPassenger from "./WaitingPassenger"
import CarpoolModal from "./CarpoolModal"

interface CardProps {
    time : number;
}

const Card : FC<CardProps> = (props) => {
    const [time, setTime] = useState()
    

    return (
        <>
        {props.time}
        </>
    )
}

export default Card