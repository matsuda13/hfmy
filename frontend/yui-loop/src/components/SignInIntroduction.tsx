import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';

const SignInIntroduction = () => {
    const appContext = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = () => { setIsModalOpen(prevState => !prevState); };

    return (
        <>  
            <button className='menue-btn' type='button' onClick={handleModal}><span>YUI LOOPナビ</span></button>
            <Modal
                isOpen={isModalOpen}
                ariaHideApp={false}
                className="into-modal"
                overlayClassName="overlay"
                onRequestClose={handleModal}
            >
                            <p>{appContext.isSignedIn ? (
                <div className='ex-container'>
                    <p>掲示板の見方</p>
                    <div className='ex-1'></div>
                    <p>募集の仕方</p>
                    <div className='ex-2'></div>
                    <p>募集カードの見方</p>
                    <div className='ex-3'></div>
                    <button type='button' onClick={handleModal}>閉じる</button>
                </div>
                ):(
                    <>
                        <div className='example-text'>
                            <p>YUI LOOPとは。</p>
                            <p className='text-bold'>移動に<span className='orange-line'>困っている</span>学生<br/>×<br/>移動を<span className='green-line'>助けたい</span>学生</p>
                            <p>
                            運転してくれる学生と<br/>乗せてもらいたい学生をつなぐ<br/>マッチングアプリです。  
                            </p>
                            <button type='button' onClick={handleModal}>閉じる</button>
                        </div>

                    </>

                )}
            </p>
            </Modal>

        </>
    );
};

export default SignInIntroduction;