import { AppState } from "../../contexts/AppContext";

export default async function deleteSchedule(id:string) {
    const deleteScheduleURL = 'http://localhost:8080/delete-schedule';
    await fetch(deleteScheduleURL, {
        method: 'POST',
        body: JSON.stringify({"id":id})
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve();
            }
            return Promise.reject();
        });
}