import { ScheduleState } from "../../contexts/ScheduleContext";

export default async function postSchedule(
    scheduleContext: ScheduleState,
    time: string,
    start: string,
    destination: string,
    capacity: string,
) {
    const postScheduleURL = 'http://localhost/api/post-schedule';
    await fetch(postScheduleURL, {
        method: 'POST',
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