export default async function deleteSchedule(id:string) {
    const deleteScheduleURL = process.env.REACT_APP_API_URL + '/delete-schedule';
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