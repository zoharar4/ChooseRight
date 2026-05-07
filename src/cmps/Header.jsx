import { NavLink, useLocation, useNavigate } from "react-router"
import logo from "../assets/images/logo.png"
import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"
import { siteConfig } from "../services/site.config"

export function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useUser()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navItems = siteConfig.navItems


    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 900px)");
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


    return (
        <>
            <header className="header">
                <div className="header-inner">

                    <div className="logo-container" onClick={() => navigate(user ? '/admin' : '/')}>
                        <img className="logo" src={logo} alt="logo" />
                    </div>

                    <nav className="header-nav">
                        {navItems.map(n => (
                            <NavLink key={n.id} to={n.id} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>{n.label}</NavLink>
                        ))}
                    </nav>

                    <button className="meeting-btn" onClick={() => navigate("contact")}>
                        לקביעת פגישה
                    </button>

                    <button className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>
            </header >

            {isMenuOpen && (
                <div className="mobile-nav">
                    {navItems.map(n => (
                        <span key={n.id} onClick={() => navigate(n.id)}>{n.label}</span>
                    ))}
                    <button className="meeting-btn" onClick={() => navigate("contact")}>
                        לקביעת פגישה
                    </button>
                </div>
            )}

        </>
    )
}