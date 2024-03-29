import { AppState } from "../../contexts/AppContext";

export default async function postSchedule(
    appContext: AppState,
    date: string,
    time: string,
    departurePlace: string,
    destination: string,
    capacity: string,
    memo: string,
    userName: string,
    gender: string,
    grade: string,
) {
    const postScheduleURL = process.env.REACT_APP_API_URL + '/post-schedule';
    await fetch(postScheduleURL, {
        method: 'POST',
        body: JSON.stringify({
            date,
            time,
            departurePlace,
            destination,
            capacity,
            memo,
            userName,
            gender,
            grade,
        })
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve();
            }
            return Promise.reject();
        });
}