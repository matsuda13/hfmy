import { AppState } from "../../contexts/AppContext";


export default async function fetchSchedule(
    appContext: AppState,
) {
    const fetchScheduleURL = process.env.REACT_APP_API_URL + '/get-schedule';
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
            const schedules = json.schedules
            for (var i=0;i<schedules.length;i++){
                schedules[i]["isAlreadyRequested"] = false;
                var candidates = schedules[i]["candidates"].split('\n')
                for (var j=0;j<candidates.length;j++) {
                    if (candidates[j] == appContext.userName){
                        schedules[i]["isAlreadyRequested"] = true;
                    }
                }
            }
            appContext.setWaitingPassengers(schedules);
            return Promise.resolve();
        });
}