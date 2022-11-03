import react, {FC, useState} from "react"
import {TimeContext} from "../App"


interface CardProps {
    time : number;
}

const Card : FC = () => {
    const {time, setTime} = react.useContext(TimeContext)
    return (
        <div className="card">
            {time}に出発地〇〇から目的地〇〇への相乗り乗客を乗車可能人数〇〇人で募集しています
        </div>
    )
}

export default Card