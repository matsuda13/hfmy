import { AppState } from "../../contexts/AppContext";

export default async function postPassengerSchedule(
    appContext: AppState,
    date: string,
    time: string,
    departurePlace: string,
    destination: string,
    memo: string,
    userName: string,
    gender: string,
    grade: string,
) {
    const postPassengerScheduleURL = process.env.REACT_APP_API_URL + '/post-passenger-schedule';
    await fetch(postPassengerScheduleURL, {
        method: 'POST',
        body: JSON.stringify({
            date,
            time,
            departurePlace,
            destination,
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