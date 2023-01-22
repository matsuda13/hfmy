import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

const SignInTitle = () => {
    const appContext = useContext(AppContext);
    return (
        <>
            <div className="menue-icon">
                <h1></h1>
            
            </div>    
            <div className="menue-text">
                <h1>YUI LOOP</h1>
                <p>{appContext.isSignedIn ? (<p>こんにちは {appContext.userName} さん</p>):(<p>ログインしてください</p>)}</p>
            </div>
        </>
    );
};

export default SignInTitle;