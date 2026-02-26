import { NavLink, useNavigate } from "react-router"
import image1 from "../assets/images/image1.jpeg"
import image2 from "../assets/images/1.png"
import { ContactForm } from "../cmps/ContactForm.jsx"

export function HomePage() {

    const navigate = useNavigate()

    return (
        <>
            <div className="home_image_2_container">
                <img  className="home_image_2" src={image2} alt="" />
                <div>
                    <div>
                        <h1 className="no-select" >לבחור נכון</h1>
                        <h2 className="no-select">הבחירה בידיים שלך</h2>
                    </div>
                </div>
            </div>
            <div className="home-page">
                <section className="owner-sec-home">
                    <section className="owner-details-home">
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

                    <div className="img-container">
                        <img draggable="false" className="home_image_1" src={image1} alt="" />
                    </div>
                </section>

                <div className="contact-sec">

                    <div className="container">
                        <div className="image-container">
                            <img src={image2} alt="" />
                        </div>

                        <div className="contact-form-container">
                            <ContactForm />
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}