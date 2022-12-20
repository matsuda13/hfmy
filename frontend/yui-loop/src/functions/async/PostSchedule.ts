import { AppState } from "../../contexts/AppContext";

export default async function postSchedule(
    appContext: AppState,
    month: string,
    date: string,
    time: string,
    departurePlace: string,
    destination: string,
    capacity: string,
    memo: string,
) {
    const postScheduleURL = 'http://localhost:8080/post-schedule';
    await fetch(postScheduleURL, {
        method: 'POST',
        body: JSON.stringify({
            month,
            date,
            time,
            departurePlace,
            destination,
            capacity,
            memo,
        })
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve();
            }
            return Promise.reject();
        });
}