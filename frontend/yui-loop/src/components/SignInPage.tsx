import {FC, useState, useContext} from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from '../contexts/AppContext';
import signUp from "../functions/async/SignUp";
import signIn from "../functions/async/SignIn";

const SignInPage:FC = () => {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmination, setPasswordConfirmination] = useState('');

    const SignUp = () => {
        signUp(appContext, userName, password, passwordConfirmination)
    }
    const SignIn = () => {
        signIn(appContext, userName, password)
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handlePasswordConfirminationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmination(e.target.value);
    };

    return(
        <div>
            <div className="signUp">
                <label>ユーザー名</label>
                <input type="text" value={userName} onChange={handleNameChange} placeholder='ユーザー名'></input>
                <label>パスワード</label>
                <input type="password" value={password} onChange={handlePasswordChange} placeholder='パスワード'></input>
                <label>パスワード(確認用)</label>
                <input type="password" value={passwordConfirmination} onChange={handlePasswordConfirminationChange} placeholder='パスワード'></input>
                <button onClick={()=>{
                    SignUp();
                    navigate("/board")}}>サインアップ</button>
            </div>


            <div className='user-name'>
                    <label>ユーザー名</label>
                    <input type="text" placeholder='ユーザー名'></input>
            </div>
            <div className='password'>
                    <label>パスワード</label>
                    <input type="password" placeholder='パスワード'></input>
            </div>
            <div className="signIn">
                <button onClick={()=>{
                    SignIn();
                    navigate("/board")}}>サインイン</button>
            </div>
        </div>
    )
}

export default SignInPage