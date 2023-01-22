import { AppState } from "../../contexts/AppContext";

export default async function signUp(
    appContext: AppState | null,
    name: string,
    gender: string,
    grade: string,
    password: string,
    passwordConfirmination: string,
) {
    const signUpUrl = process.env.REACT_APP_API_URL + '/sign-up';
    fetch(signUpUrl, {
        method: 'POST',
        body: JSON.stringify({
            name,
            gender,
            grade,
            password,
            passwordConfirmination,
        })
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.json());
            }
            return Promise.reject();
        })
        .then((json) => {
            appContext?.setUserName(json?.name);
            appContext?.setGender(json?.gender);
            appContext?.setGrade(json?.grade);
            appContext?.setIsSignedIn(true);
        })
        .catch(() => {
            appContext?.setIsSignedIn(false);
        });
}