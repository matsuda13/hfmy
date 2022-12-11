import { ScheduleState } from "../../contexts/ScheduleContext";

export default async function fetchSchedule(
    scheduleContext: ScheduleState,
    time: string,
    start: string,
    destination: string,
    capacity: string,
) {
    const fetchScheduleURL = 'http://localhost/api/get-schedule';
    await fetch(fetchScheduleURL, {
        method: 'GET',
        body: JSON.stringify({
            time,
            start,
            destination,
            capacity,
        })
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve(response.json());
            }
            return Promise.reject();
        })
        .then((json) => {
            scheduleContext!.setTime(json!.time);
            scheduleContext!.setStart(json!.start);
            scheduleContext!.setDestination(json!.destination);
            scheduleContext!.setCapacity(json!.capacity);
            return Promise.resolve();
        });
}