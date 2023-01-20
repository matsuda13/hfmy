export default async function deletePassengerSchedule(id:string) {
    const deletePassengerScheduleURL = process.env.REACT_APP_API_URL + '/delete-passenger-schedule';
    await fetch(deletePassengerScheduleURL, {
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