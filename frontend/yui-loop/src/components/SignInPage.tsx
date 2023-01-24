import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import fetchSchedule from '../functions/async/FetchSchedule';

const SignInPage = () => {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);

    const navigateToBulletinBoardPage = () => {
        navigate('/board');
    };
    const ComponentsToRenderIfNotSignedIn = () => {
        if (!appContext?.isSignedIn) {
            return (
                <div className=''>
                    <SignUpModal />
                    <SignInModal />
                </div>
            );
        }
        return (
            <button className="menue-btn" onClick={()=>{
                fetchSchedule(appContext)
                navigateToBulletinBoardPage()
            }}><span>YUI LOOPを利用する</span></button>
        );
    };
    return (
        <>
            <ComponentsToRenderIfNotSignedIn />
        </>
    );
};
export default SignInPage;