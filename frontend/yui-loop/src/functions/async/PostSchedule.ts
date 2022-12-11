// import { ScheduleState } from "../../contexts/ScheduleContext";
import { AppState } from "../../contexts/AppContext";

export default async function postSchedule(
    // scheduleContext: ScheduleState,
    appContext: AppState,
    month: string,
    date: string,
    time: string,
    start: string,
    destination: string,
    capacity: string,
) {
    const postScheduleURL = 'http://localhost:8080/post-schedule';
    await fetch(postScheduleURL, {
        method: 'POST',
        body: JSON.stringify({
            month,
            date,
            time,
            start,
            destination,
            capacity,
        })
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve();
            }
            return Promise.reject();
        });
}