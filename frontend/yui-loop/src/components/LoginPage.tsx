import {FC} from "react"
import { useNavigate } from "react-router-dom"

const LoginPage:FC = () => {
    const navigate = useNavigate();
    const LoginButtonClick = () => {
        console.log("Loginします")
    }

    return(
        <div className="login">
            <button onClick={()=>{navigate("/board")}}>ログイン</button>
        </div>
    )
}

export default LoginPage