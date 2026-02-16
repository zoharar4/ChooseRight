import { NavLink } from "react-router"
import logo from "../assets/images/logo_no_bg.png"

export function Header() {
    
    return (
        <div className="header">
            <img src={logo} alt="logo" />
            <nav>
                <div>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        בית
                    </NavLink>

                    <NavLink to="/תכניות_ליווי" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        תכניות ליווי
                    </NavLink>

                    <NavLink to="/בלוג" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        בלוג
                    </NavLink>

                    <NavLink to="/מתכונים" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        מתכונים
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/אודותי" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        אודותי
                    </NavLink>
                    <NavLink to="/יצירת_קשר" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        יצירת קשר
                    </NavLink>

                </div>
            </nav>

        </div>
    )
}