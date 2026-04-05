import logo from "../../public/logo.svg"
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
                        <button>חזרה למעלה</button>
                    </div>
                </div>
        <hr />
                <div className="section2">
                    <p>רשתות חברתיות</p>
                    <div>
                        <i className="fa-brands fa-square-instagram"></i>
                        <i className="fa-brands fa-square-facebook"></i>
                    </div>
                    <p>מייל - shimritben1@gmail.com</p>
                </div>
            </div>
            <div className="section3">
                <p>כל הזכויות שמורות</p>
            </div>
        </footer>
    )
}