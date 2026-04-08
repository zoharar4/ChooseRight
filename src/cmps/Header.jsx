import { NavLink, useLocation, useNavigate } from "react-router"
import logo from "../assets/images/logo.png"
import menuSvg from "../assets/images/menu.svg"
import closeSvg from "../assets/images/close.svg"
import { useEffect, useState } from "react"

export function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navItems = [
        { id: "/", label: "דף הבית" },
        { id: "/plans", label: "תכניות ליווי" },
        { id: "/blog", label: "בלוג" },
        { id: "/recipes", label: "מתכונים" },
        { id: "/about", label: "אודותי" },
        { id: "/contact", label: "יצירת קשר" },
    ]

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

                    <div className="logo-container" onClick={() => navigate('/admin')}>
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
{/* <div className="mobile-container">
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
    </nav> */}