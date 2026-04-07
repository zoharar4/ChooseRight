import { NavLink, useLocation, useNavigate } from "react-router"
import logo from "../assets/images/logo.png"
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
                <nav className="nav-bar">
                    <img className="logo" onClick={() => navigate('/admin')} src={logo} alt="logo" />
                    <div>
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            בית
                        </NavLink>

                        <NavLink to="/plans" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            תכניות ליווי
                        </NavLink>

                        <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            בלוג
                        </NavLink>

                        <NavLink to="/recipes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            מתכונים
                        </NavLink>
                    </div>

                    <div>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            אודותי
                        </NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            יצירת קשר
                        </NavLink>

                    </div>
                </nav>
                <div className="mobile-container">
                    <button onClick={onMenu} className="burger-menu"><img draggable="false" src={isMenuOpen ? closeSvg : menuSvg} alt="" /></button>
                    <img className="logo" onClick={() => navigate('/admin')} src={logo} alt="logo" />
                </div>
                <nav className={`mobile-nav ${isMenuOpen ? "active" : ''}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        בית
                    </NavLink>

                    <NavLink to="/plans" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        תכניות ליווי
                    </NavLink>

                    <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        בלוג
                    </NavLink>

                    <NavLink to="/recipes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        מתכונים
                    </NavLink>

                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        אודותי
                    </NavLink>

                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
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