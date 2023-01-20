import React, { useState, FC, ReactNode, Dispatch, SetStateAction } from 'react';
import { WaitingPassengerType } from '../types/WaitingPassengerType';
import { WaitingDriverType } from '../types/WaitingDriverType';

interface Props {
    children: ReactNode;
}

export interface AppState {
    isSignedIn: boolean,
    setIsSignedIn: Dispatch<SetStateAction<boolean>>,
    userName: string,
    setUserName: Dispatch<SetStateAction<string>>,
    gender: string,
    setGender: React.Dispatch<React.SetStateAction<string>>,
    grade: string,
    setGrade: React.Dispatch<React.SetStateAction<string>>,
    id: string,

    // driver_schdule
    dsDate: string
    setDsDate: React.Dispatch<React.SetStateAction<string>>
    dsTimeToAdd: string
    setDsTimeToAdd: React.Dispatch<React.SetStateAction<string>>
    dsDeparturePlaceToAdd: string
    setDsDeparturePlaceToAdd: React.Dispatch<React.SetStateAction<string>>
    dsDestinationToAdd: string
    setDsDestinationToAdd: React.Dispatch<React.SetStateAction<string>>
    dsCapacityToAdd: string
    setDsCapacityToAdd: React.Dispatch<React.SetStateAction<string>>  
    dsMemo: string
    setDsMemo: React.Dispatch<React.SetStateAction<string>>
    waitingPassengers:  Array<WaitingPassengerType>
    setWaitingPassengers: React.Dispatch<React.SetStateAction<Array<WaitingPassengerType>>>
    deleteWaitingPassenger: Function

    // passenger_schdule
    psDate: string
    setPsDate: React.Dispatch<React.SetStateAction<string>>
    psTimeToAdd: string
    setPsTimeToAdd: React.Dispatch<React.SetStateAction<string>>
    psDeparturePlaceToAdd: string
    setPsDeparturePlaceToAdd: React.Dispatch<React.SetStateAction<string>>
    psDestinationToAdd: string
    setPsDestinationToAdd: React.Dispatch<React.SetStateAction<string>>
    psMemo: string
    setPsMemo: React.Dispatch<React.SetStateAction<string>>
    waitingDrivers: Array<WaitingDriverType>
    setWaitingDrivers: React.Dispatch<React.SetStateAction<Array<WaitingDriverType>>>
    deleteWaitingDriver: Function

    isErrorState:boolean
    setIsErrorState:React.Dispatch<React.SetStateAction<boolean>>
    notMoveErrorMessage:string
    setNotMoveErrorMessage:React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = React.createContext({} as AppState);

export const AppContextProvider: FC<Props> = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState("");
    const [grade, setGrade] = useState("");
    const [id, _] = useState("");
    
    // driver_schedule
    const [dsDate, setDsDate] = useState<string>(new Date().toLocaleDateString());
    const [dsTimeToAdd, setDsTimeToAdd] = useState("1限休み(10:00~10:10)");
    const [dsDeparturePlaceToAdd, setDsDeparturePlaceToAdd] = useState("工学部駐車場");
    const [dsDestinationToAdd, setDsDestinationToAdd] = useState("工学部駐車場");
    const [dsCapacityToAdd, setDsCapacityToAdd] = useState("1");
    const [dsMemo, setDsMemo] = useState<string>("");
    const [waitingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
    const deleteWaitingPassenger = (id:number) => {
        const tempList = [...waitingPassengers];
        // id番目の要素を削除する
        tempList.splice(id, 1);
        setWaitingPassengers(tempList);
    }

    // passenger_schedule
    const [psDate, setPsDate] = useState<string>(new Date().toLocaleDateString());
    const [psTimeToAdd, setPsTimeToAdd] = useState("1限休み(10:00~10:10)");
    const [psDeparturePlaceToAdd, setPsDeparturePlaceToAdd] = useState("工学部駐車場");
    const [psDestinationToAdd, setPsDestinationToAdd] = useState("工学部駐車場");
    const [psMemo, setPsMemo] = useState<string>("");
    const [waitingDrivers, setWaitingDrivers] = useState<Array<WaitingDriverType>>([]);
    const deleteWaitingDriver = (id:number) => {
        const tempList = [...waitingDrivers];
        // id番目の要素を削除する
        tempList.splice(id, 1);
        setWaitingDrivers(tempList);
    }

    const [isErrorState, setIsErrorState] = useState<boolean>(false)
    const [notMoveErrorMessage, setNotMoveErrorMessage] = useState<string>("")

    return (
        <AppContext.Provider value={{
            isSignedIn,
            setIsSignedIn,
            userName,
            setUserName,
            gender,
            setGender,
            grade,
            setGrade,
            id,
            
            // driver_schdule
            dsDate,
            setDsDate,
            dsTimeToAdd,
            setDsTimeToAdd,
            dsDeparturePlaceToAdd,
            setDsDeparturePlaceToAdd,
            dsDestinationToAdd,
            setDsDestinationToAdd,
            dsCapacityToAdd,
            setDsCapacityToAdd,
            dsMemo,
            setDsMemo,
            waitingPassengers,
            setWaitingPassengers,
            deleteWaitingPassenger,

            // passenger_schdule
            psDate,
            setPsDate,
            psTimeToAdd,
            setPsTimeToAdd,
            psDeparturePlaceToAdd,
            setPsDeparturePlaceToAdd,
            psDestinationToAdd,
            setPsDestinationToAdd,
            psMemo,
            setPsMemo,
            waitingDrivers,
            setWaitingDrivers,
            deleteWaitingDriver,

            isErrorState,
            setIsErrorState,
            notMoveErrorMessage,
            setNotMoveErrorMessage
        }}>
            { children }
        </AppContext.Provider>
    );
};