import { NavLink, useLocation, useNavigate } from "react-router"
import logo from "../assets/images/logo2.png"
import menuSvg from "../assets/images/menu.svg"
import closeSvg from "../assets/images/close.svg"
import { useEffect, useState } from "react"

export function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1000px)");
        const handleChange = (e) => {
            if (e.matches) {
                setIsMenuOpen(false);
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [])

    function onMenu() {
        setIsMenuOpen(value => !value)
    }

    return (
        <>
            <div className="header">
                <img className="logo" onClick={() => navigate('/')} src={logo} alt="logo" />
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

                <button onClick={onMenu} className="burger-menu"><img draggable="false" src={isMenuOpen ? closeSvg : menuSvg} alt="" /></button>
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
            {isMenuOpen && (
                <div
                    className="menu-overlay"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </>
    )
}