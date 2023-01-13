export default async function deleteExpiredSchedule() {
    const deleteExpiredScheduleURL = process.env.REACT_APP_API_URL + '/delete-expired-schedule';
    await fetch(deleteExpiredScheduleURL, {
        method: 'POST'
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve();
            }
            return Promise.reject();
        });
}