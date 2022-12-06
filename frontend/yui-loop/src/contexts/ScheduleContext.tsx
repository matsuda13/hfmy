import React, { useState, FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const ScheduleContext = React.createContext({} as {
    time: string
    setTime: React.Dispatch<React.SetStateAction<string>>
    start: string
    setStart: React.Dispatch<React.SetStateAction<string>>
    destination: string
    setDestination: React.Dispatch<React.SetStateAction<string>>
    capacity: string
    setCapacity: React.Dispatch<React.SetStateAction<string>>
});

export const ScheduleContextProvider: FC<Props> = ({ children }) => {
    const [time, setTime] = useState("1限休み(10:00~10:10)");
    const [start, setStart] = useState("工学部駐車場");
    const [destination, setDestination] = useState("工学部駐車場");
    const [capacity, setCapacity] = useState("1");
    return (
        <ScheduleContext.Provider value={{
            time,
            setTime,
            start,
            setStart,
            destination,
            setDestination,
            capacity,
            setCapacity,
        }}>
            { children }
        </ScheduleContext.Provider>
    );
};