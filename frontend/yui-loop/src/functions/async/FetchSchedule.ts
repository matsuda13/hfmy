// import { DeleteState } from "../../contexts/DeleteContext";
import { AppState } from "../../contexts/AppContext";

export default async function fetchSchedule(
    // deleteContext: DeleteState,
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
            // deleteContext.setWaitingPassengers(json!.schedules);
            appContext.setWaitingPassengers(json!.schedules);
            return Promise.resolve();
        });
}