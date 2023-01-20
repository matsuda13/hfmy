export default async function SendCarpoolRequest(id:string, userName:string) {
    const deleteScheduleURL = process.env.REACT_APP_API_URL + '/send-carpool-request';
    await fetch(deleteScheduleURL, {
        method: 'POST',
        body: JSON.stringify({
            "id":id,
            "userName":userName
        })
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve();
            }
            return Promise.reject();
        });
}