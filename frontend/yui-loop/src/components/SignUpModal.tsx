import React, { ChangeEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';
import signUp from '../functions/async/SignUp';

function SignUpModal() {
    const appContext = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => { setIsModalOpen(true); };
    const closeModal = () => { setIsModalOpen(false); };
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('男性');
    const [grade, setGrade] = useState('学部1年');
    const [password, setPassword] = useState('');
    const [passwordConfirmination, setPasswordConfirmination] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };
    const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGrade(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handlePasswordConfirminationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmination(e.target.value);
    };
    const handleSignUp = () => {
        signUp(appContext, userName, gender, grade, password, passwordConfirmination)
            .then(() => {
                if (appContext?.isSignedIn) {
                    closeModal();
                } else {
                    const errorMessageOfSignUp = '無効な入力です。（原因: すでに存在するユーザー名、無効なパスワードなど）';
                    setErrorMessage(errorMessageOfSignUp);
                }
            });
    };
    const handleCancel = () => {
        setUserName('');
        setGender('男性');
        setGrade('学部1年');
        setPassword('');
        setPasswordConfirmination('');
        setErrorMessage('');
        closeModal();
    };
    return (
        <div>
            <button className="menue-btn" type="button" onClick={openModal}><span>サインアップ</span></button>
            <Modal 
                isOpen={isModalOpen}
                ariaHideApp={false}                
                className="into-modal"
                overlayClassName="overlay"
            >
                <div className='example-text'>
                    <p className='text-bold'>サインアップ</p>
                <div className='user-name'>
                    <label>ユーザー名</label>
                    <input type="text" value={userName} onChange={handleNameChange} placeholder='ユーザー名'></input>
                </div>
                <div className='gender'>
                    <div>
                        <label htmlFor='male'>男性</label>
                        <input type="radio" id='male' name='gender' value='男性' onChange={handleGenderChange}></input>
                    </div>
                    <div>
                        <label htmlFor='female'>女性</label>
                        <input type="radio" id='female' name='gender' value='女性' onChange={handleGenderChange}></input>
                    </div>
                    <div>
                        <label htmlFor='other'>その他</label>
                        <input type="radio" id='other' name='gender' value='その他' onChange={handleGenderChange}></input>
                    </div>
                </div>
                <div className='grade'>
                    <label>学年</label>
                    <select name="grade" onChange={handleGradeChange}>
                        <option value="学部1年">学部1年</option>
                        <option value="学部2年">学部2年</option>
                        <option value="学部3年">学部3年</option>
                        <option value="学部4年">学部4年</option>
                        <option value="修士1年">修士1年</option>
                        <option value="修士2年">修士2年</option>
                        <option value="博士1年">博士1年</option>
                        <option value="博士2年">博士2年</option>
                    </select>
                </div>
                <div className='password'>
                    <label>パスワード</label>
                    <input type="password" value={password} onChange={handlePasswordChange}placeholder='パスワード'></input>
                </div>

                <div className='password-confirmination'>
                    <label>パスワード(確認用)</label>
                    <input type="password" value={passwordConfirmination} onChange={handlePasswordConfirminationChange} placeholder='パスワード(確認用)'></input>
                </div>
                <p>{errorMessage}</p>
                <button className="menue-btn" onClick={() => handleCancel()}><span>キャンセル</span></button>
                <button className="menue-btn" onClick={() => handleSignUp()}><span>送信</span></button>
            
                </div>
                </Modal>
        </div>
    );
}
export default SignUpModal;