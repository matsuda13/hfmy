import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

const SignInTitle = () => {
    const appContext = useContext(AppContext);
    return (
        <>
            <div className="menue-icon">
                <h1></h1>
            
            </div>    
            
            <p>YUI LOOP</p>
            <p>{appContext.isSignedIn ? (<p>こんにちは {appContext.userName} さん</p>):(<p>ログインしてください</p>)}</p>
        </>
    );
};

export default SignInTitle;