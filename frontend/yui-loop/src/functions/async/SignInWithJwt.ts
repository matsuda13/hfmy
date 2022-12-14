import { AppState } from "../../contexts/AppContext";

export default async function signInWithJwt(appContext: AppState | null) {
    const signInWithJwtUrl = process.env.REACT_APP_API_URL + '/sign-in-with-jwt';
    fetch(signInWithJwtUrl, {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.json());
            }
            return Promise.reject();
        })
        .then((json) => {
            appContext?.setUserName(json?.name);
            appContext?.setIsSignedIn(true);
        })
        .catch(() => {
            appContext?.setIsSignedIn(false);
        });
}