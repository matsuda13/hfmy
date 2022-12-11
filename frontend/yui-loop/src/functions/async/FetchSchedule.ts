import { AppState } from "../../contexts/AppContext";

export default async function fetchSchedule(
    appContext: AppState,
) {
    const fetchScheduleURL = 'http://localhost:8080/get-schedule';
    await fetch(fetchScheduleURL, {
        method: 'GET',
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve(response.json());
            }
            return Promise.reject();
        })
        .then((json) => {
            appContext.setWaitingPassengers(json!.schedules);
            return Promise.resolve();
        });
}