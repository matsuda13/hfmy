import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexts/AppContext';
import SignUpModal from '../modals/SignUpModal';
import SignInModal from '../modals/SignInModal';

const SignInPage = () => {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);

    const navigateToPassengerWantedPage = () => {
        navigate('/passenger-wanted-page');
    };
    const ComponentsToRenderIfNotSignedIn = () => {
        if (!appContext?.isSignedIn) {
            return (
                <>
                    <SignUpModal />
                    <SignInModal />
                </>
            );
        }
        return (
            <button onClick={navigateToPassengerWantedPage}>YUI LOOPを利用する</button>
        );
    };
    return (
        <>
            <ComponentsToRenderIfNotSignedIn />
        </>
    );
};
export default SignInPage;