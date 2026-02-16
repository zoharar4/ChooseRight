import { NavLink } from "react-router"
import image1 from "../assets/images/image1.jpeg"
import { ContactForm } from "../cmps/ContactForm"

export function HomePage() {

    function onMoreDetails() {
        
    }

    return (
        <>
            {/* <img src="" alt="" /> */}
            <div className="home-page">
                <section className="client-sec-home">
                    <img src={image1} alt="" />
                    <section className="client-details-home">
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
                        <NavLink to={"/תכניות_ליווי"}>תכניות ליווי</NavLink>
                        <NavLink to={"/אודותי"}>אודותי</NavLink>
                    </section>
                </section>
                
                <ContactForm />
            </div>
        </>

    )
}