import { useNavigate } from "react-router"
import logo from "../assets/images/logo_no_bg.png"

export function Header() {

    const navigate = useNavigate()
    // const


    return (
        <div className="header">
            <nav>
                <button onClick={() => navigate('/יצירת_קשר')}>יצירת קשר</button>
                <button onClick={() => navigate('/אודותי')}>אודותי</button>
                <button onClick={() => navigate('/מתכונים')}>מתכונים</button>
                <button onClick={() => navigate('/בלוג')}>בלוג</button>
                <button onClick={() => navigate('/תכניות_ליווי')}>תכניות ליווי</button>
                <button onClick={() => navigate('/')}>בית</button>
            </nav>
            <img src={logo} alt="" />
        </div>
    )
}