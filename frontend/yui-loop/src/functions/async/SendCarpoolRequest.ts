import { json } from "stream/consumers";
import { AppState } from "../../contexts/AppContext";

export default async function SendCarpoolRequest(
    userName: string,
    
) {
    const sendRequestURL = process.env.REACT_APP_API_URL + '/sendRequest';
    await fetch(sendRequestURL, {
        method: 'POST',
        body: JSON.stringify({"userName":userName})
    })
        .then((response) => {
            if (response.statusText === 'OK') {
                return Promise.resolve();
            }
            return Promise.reject();
        });
}