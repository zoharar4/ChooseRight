import { NavLink, useNavigate } from "react-router"
import logo from "../assets/images/logo2.png"
import { useState } from "react"

export function Header() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function onMenu() {
        setIsMenuOpen(value => !value)
    }

    return (
        <div className="header">
            <img onClick={()=>navigate('/')} src={logo} alt="logo" />
            <nav className="nav-bar">
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

            <button onClick={onMenu} className="burger-menu">{isMenuOpen ? "✖" : "☰"}</button>
            <nav className={`mobile-nav ${isMenuOpen ? "active" : ''}`}>
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

                <NavLink to="/אודותי" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    אודותי
                </NavLink>

                <NavLink to="/יצירת_קשר" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    יצירת קשר
                </NavLink>
            </nav>
        </div>
    )
}