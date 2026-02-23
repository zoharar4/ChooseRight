import { NavLink, useNavigate } from "react-router"
import image1 from "../assets/images/image1.jpeg"
import image2 from "../assets/images/1.png"
import { ContactForm } from "../cmps/ContactForm"

export function HomePage() {

    const navigate = useNavigate()

    function onMoreDetails() {

    }

    return (
        <>
            <div className="home_image_2_container">
                <img className="home_image_2" src={image2} alt="" />
                <div>
                    <div>
                        <h1>לבחור נכון</h1>
                        <h2>הבחירה בידיים שלך</h2>
                    </div>
                </div>
            </div>
            <div className="home-page">
                <section className="client-sec-home">
                    <div className="img-container">
                        <img className="home_image_1" src={image1} alt="" />
                    </div>
                    <section className="client-details-home">
                        <div className="txt-container">
                            <h1>החופש לבחור בחיים טובים יותר</h1>
                            <p>
                                שמי שמרית בן עמי, אמא ל- 9 ילדים מופלאים, בעלת תואר ראשון במנהל עסקים, בוגרת מכללת "אילמה" במגמת בריאות טבעית ועין הבדולח וכן בוגרת מכללת "תוצאות NLP Master-Practition.
                            </p>

                            <p>
                                בנוסף, אני מנחת סדנאות יצירה בתחום המנדלות.
                            </p>

                            <p>
                                ניסיון החיים העשיר שלי ותהליך אישי ומורכב שעברתי הביא איתו רצון וצורך ממשי להתפתחות אישית וכפועל יוצא מכך גם המון רצון לעזור לאחרים להתפתח ולהצליח בחייהם ולאפשר להם חיבור מיטבי למשאבים שלהם.
                            </p>
                        </div>
                        <div className="btn-container">
                            <button className="plans-btn" onClick={() => navigate("/תכניות_ליווי")} >תכניות ליווי</button>
                            <button className="more-btn" onClick={() => navigate("/אודותי")}>אודותי</button>
                        </div>
                    </section>
                </section>

                <ContactForm />
            </div>
        </>

    )
}