import React, { useState, FC, ReactNode, Dispatch, SetStateAction } from 'react';
import { WaitingPassengerType } from '../types/WaitingPassengerType';

interface Props {
    children: ReactNode;
}

export interface AppState {
    isSignedIn: boolean,
    setIsSignedIn: Dispatch<SetStateAction<boolean>>,
    userName: string,
    setUserName: Dispatch<SetStateAction<string>>,
    id: string
    date: string
    setDate: React.Dispatch<React.SetStateAction<string>>
    timeToAdd: string
    setTimeToAdd: React.Dispatch<React.SetStateAction<string>>
    departurePlaceToAdd: string
    setDeparturePlaceToAdd: React.Dispatch<React.SetStateAction<string>>
    destinationToAdd: string
    setDestinationToAdd: React.Dispatch<React.SetStateAction<string>>
    capacityToAdd: string
    setCapacityToAdd: React.Dispatch<React.SetStateAction<string>>  
    waitingPassengers:  Array<WaitingPassengerType>
    setWaitingPassengers: React.Dispatch<React.SetStateAction<Array<WaitingPassengerType>>>
    deleteWaitingPassenger: Function
    memo: string
    setMemo: React.Dispatch<React.SetStateAction<string>>
    isErrorState:boolean
    setIsErrorState:React.Dispatch<React.SetStateAction<boolean>>
    notMoveErrorMessage:string
    setNotMoveErrorMessage:React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = React.createContext({} as AppState);

export const AppContextProvider: FC<Props> = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [id, _] = useState("");
    const [date, setDate] = useState<string>(new Date().toLocaleDateString());
    const [timeToAdd, setTimeToAdd] = useState("1限休み(10:00~10:10)");
    const [departurePlaceToAdd, setDeparturePlaceToAdd] = useState("工学部駐車場");
    const [destinationToAdd, setDestinationToAdd] = useState("工学部駐車場");
    const [capacityToAdd, setCapacityToAdd] = useState("1");
    const [waitingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
    const [memo, setMemo] = useState<string>("");
    const [isErrorState, setIsErrorState] = useState<boolean>(false)
    const [notMoveErrorMessage, setNotMoveErrorMessage] = useState<string>("")
    const deleteWaitingPassenger = (id:number) => {
        const tempList = [...waitingPassengers];
        // id番目の要素を削除する
        tempList.splice(id, 1);
        setWaitingPassengers(tempList);
    }
    return (
        <AppContext.Provider value={{
            isSignedIn,
            setIsSignedIn,
            userName,
            setUserName,
            id,
            date,
            setDate,
            timeToAdd,
            setTimeToAdd,
            departurePlaceToAdd,
            setDeparturePlaceToAdd,
            destinationToAdd,
            setDestinationToAdd,
            capacityToAdd,
            setCapacityToAdd,
            waitingPassengers,
            setWaitingPassengers,
            deleteWaitingPassenger,
            memo,
            setMemo,
            isErrorState,
            setIsErrorState,
            notMoveErrorMessage,
            setNotMoveErrorMessage
        }}>
            { children }
        </AppContext.Provider>
    );
};