import React, { useState, FC, ReactNode } from 'react';
import { WaitingPassengerType } from '../types/WaitingPassengerType';

interface Props {
    children: ReactNode;
}

export const DeleteContext = React.createContext({} as {
    waitingPassengers: Array<WaitingPassengerType>,
    setWaitingPassengers: React.Dispatch<Array<WaitingPassengerType>>,
    deleteWaitingPassenger: Function,
});

export const DeleteContextProvider: FC<Props> = ({ children }) => {      
    const [waitingPassengers, setWaitingPassengers] = useState<Array<WaitingPassengerType>>([]);
    const deleteWaitingPassenger = (id:number) => {
        const tempList = [...waitingPassengers];
        // id番目の要素を削除する
        tempList.splice(id, 1);
        setWaitingPassengers(tempList);
    }
    return (
        <DeleteContext.Provider value={{
            waitingPassengers,
            setWaitingPassengers,
            deleteWaitingPassenger,
        }}>
            { children }
        </DeleteContext.Provider>
    );
};