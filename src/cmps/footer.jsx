import logo from "../../public/logo.png"
export function Footer() {

    return (
        <footer>
            <div className="container">

                <div className="section1">
                    <div className="logo-name-container">
                        <img src={logo} alt="logo" />
                        <div className="website-name">
                            <h2>לבחור נכון</h2>
                            <h3>שמרית בן עמי</h3>
                        </div>
                    </div>
                    <div className="up-btn">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            חזרה למעלה
                        </button>
                    </div>
                </div>
                <div className="section2">

                    <div className="social-container">
                        <p>רשתות חברתיות</p>
                        <div className="social-icons">
                            <a
                                href="https://www.instagram.com/lbhwr.nkwn.smryt.bn.my"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon instagram"
                                aria-label="Instagram">
                                <i className="fa-brands fa-square-instagram"></i>
                            </a>
                            <a
                                href="https://www.facebook.com/lbhwr.nkwn.smryt.bn.my"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon facebook"
                                aria-label="Facebook"
                            >
                                <i className="fa-brands fa-square-facebook"></i>
                            </a>
                        </div>
                    </div>

                    <div className="contact-container">

                        <div className="mail-container">
                            <i className="fa-solid fa-envelope"></i>
                            <a href="" className="contact-link">
                                shimritben1@gmail.com
                            </a>
                        </div>
                        <div className="phone-container">
                            <i className="fa-solid fa-phone"></i>
                            <a className="contact-link">
                                +972-54-588-1616
                            </a>
                            {/* <a href="tel:+972545881616" className="contact-link">
                                +972-54-588-1616
                            </a> */}
                        </div>

                    </div>

                </div>
            </div >

            <div className="section3">
                <p>כל הזכויות שמורות</p>
            </div>
        </footer >
    )
}