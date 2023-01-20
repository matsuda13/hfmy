export default async function deleteDriverSchedule(id:string) {
    const deleteDriverScheduleURL = process.env.REACT_APP_API_URL + '/delete-driver-schedule';
    await fetch(deleteDriverScheduleURL, {
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