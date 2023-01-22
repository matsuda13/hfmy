export default async function cancelCarpoolRequest(id:string, userName:string){
    const cancelCarpoolRequestUrl = process.env.REACT_APP_API_URL + '/cancel-carpool-request';
    await fetch(cancelCarpoolRequestUrl, {
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