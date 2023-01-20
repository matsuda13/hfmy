import { AppState } from "../../contexts/AppContext";

export default async function fetchDriverSchedule(
    appContext: AppState,
) {
    const fetchDriverScheduleURL = process.env.REACT_APP_API_URL + '/get-driver-schedule';
    await fetch(fetchDriverScheduleURL, {
        method: 'GET',
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve(response.json());
            }
            return Promise.reject();
        })
        .then((json) => {
            appContext.setWaitingPassengers(json!.driverSchdules);
            return Promise.resolve();
        });
}