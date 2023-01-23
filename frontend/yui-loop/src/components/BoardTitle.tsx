import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

const BoardTitle = () => {
    const appContext = useContext(AppContext);
    return (
        <>
            <div className="board-mini-icon">
                <h1></h1>
            </div>    
            <div className="board-text">
                <p>{appContext.isSignedIn ? (<p>こんにちは {appContext.userName} さん</p>):(<p>ログインしてください</p>)}</p>
            </div>
        </>
    );
};

export default BoardTitle;