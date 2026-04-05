import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import image1 from "../assets/images/image1.jpeg"
import image2 from "../assets/images/1.png"
import { ContactForm } from "../cmps/ContactForm.jsx"
import { mainService } from "../services/main.service.js"
import { PostPreview } from "../cmps/PostPreview.jsx"
import { BlockPreview } from "../cmps/BlockPreview.jsx"
import { ImageBasic } from "../cmps/ImageBasic.jsx"

export function HomePage() {

    const navigate = useNavigate()
    const [previewBlock, setPreviewBlock] = useState({ blog: [], recipes: [] })
    const [plansBlock, setPlansBlock] = useState([])

    useEffect(() => {
        loadPreviews()
    }, [])

    async function loadPreviews() {
        try {
            const [blog, recipes, plans] = await Promise.all([
                mainService.query("blog", { limit: 3 }),
                mainService.query("recipes", { limit: 3 }),
                mainService.query("plans")
            ])

            setPreviewBlock({ blog: blog.data, recipes: recipes.data })
            setPlansBlock(plans)
        } catch (err) {
            console.error("Failed loading previews", err)
        }
    }

    return (
        <>
            <div className="home-top-image">
                <ImageBasic src={image2} />
                <div>
                    <div>
                        <h1 className="no-select" >לבחור נכון</h1>
                        <h2 className="no-select">הבחירה בידיים שלך</h2>
                    </div>
                </div>
            </div>

            <div className="home-page page">
                <section className="hero-sec-home">
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
                            <button className="plans-btn" onClick={() => navigate("/plans")} >תכניות ליווי</button>
                            <button className="more-btn" onClick={() => navigate("/about")}>אודותי</button>
                        </div>
                    </section>

                    <div className="img-container">
                        <ImageBasic src={image1} className={"home_image_1"} />
                        {/* <img draggable="false" className="home_image_1" src={image1} alt="" /> */}
                    </div>
                </section>

                <BlockPreview type={'blog'} />
                <BlockPreview type={'recipes'} />

                {/* <section className="home-plans-block">
                </section> */}

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