import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

const SignInIntroduction = () => {
    const appContext = useContext(AppContext);
    return (
            <p>{appContext.isSignedIn ? (
                <div>

                </div>
                ):(
                    <>
                        <div className='no-login-into'>
                            <p>YUI LOOPとは。</p>
                            <p className='text-bold'>移動に<span className='orange-line'>困っている</span>学生<br/>×<br/>移動を<span className='green-line'>助けたい</span>学生</p>
                            <p>
                            　運転してくれる学生ドライバーと<br/>乗せてもらいたい学生をつなぐ<br/>マッチングアプリです。  
                            </p>
                        </div>
                    </>

                )}
            </p>
    );
};

export default SignInIntroduction;