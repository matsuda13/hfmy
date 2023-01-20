import { AppState } from "../../contexts/AppContext";

export default async function fetchPassengerSchedule(
    appContext: AppState,
) {
    const fetchPassengerScheduleURL = process.env.REACT_APP_API_URL + '/get-passenger-schedule';
    await fetch(fetchPassengerScheduleURL, {
        method: 'GET',
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve(response.json());
            }
            return Promise.reject();
        })
        .then((json) => {
            appContext.setWaitingPassengers(json!.passengerSchedules);
            return Promise.resolve();
        });
}