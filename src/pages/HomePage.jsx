import { useNavigate } from "react-router"
import image1 from "../assets/images/image1.jpeg"
import { BlockPreview } from "../cmps/BlockPreview.jsx"
import { ImageBasic } from "../cmps/ImageBasic.jsx"

export function HomePage() {
    const navigate = useNavigate()

    return (
        <div className="home-page">

            {/* ── Hero ── */}
            <section className="home-hero">
                <div className="home-hero-inner container">
                    <div className="home-hero-text">
                        <span className="hero-label">קואצ'ינג אישי מקצועי</span>
                        <h1 className="home-hero-title">
                            לבחור נכון,<br />
                            <span>לחיות טוב יותר</span>
                        </h1>
                        <p className="home-hero-desc">
                            עם ליווי אישי מקצועי שמותאם בדיוק עבורך — כדי שתוכלו לחבר את עצמכם למשאבים שלכם ולהצליח בחייכם.
                        </p>
                        <div className="home-hero-actions">
                            <button className="btn-primary" onClick={() => navigate("/plans")}>תכניות ליווי</button>
                            <button className="btn-outline" onClick={() => navigate("/about")}>אודותי</button>
                        </div>
                    </div>
                    <div className="home-hero-visual">
                        <div className="hero-blob-home">
                            <ImageBasic src={image1} className="hero-img-main" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features Strip ── */}
            <div className="features-strip">
                <div className="features-strip-inner container">
                    <div className="strip-item"><span className="strip-icon">🎯</span> ליווי אישי מותאם</div>
                    <div className="strip-item"><span className="strip-icon">🌱</span> גישה הוליסטית</div>
                    <div className="strip-item"><span className="strip-icon">📚</span> ידע מקצועי עמוק</div>
                    <div className="strip-item"><span className="strip-icon">💪</span> תוצאות ממשיות</div>
                    <div className="strip-item"><span className="strip-icon">✨</span> שינוי אמיתי לחיים</div>
                </div>
            </div>

            {/* ── About Strip ── */}
            <section className="home-about-strip">
                <div className="home-about-inner container">
                    <div className="about-strip-photo">
                        <ImageBasic src={image1} className="about-strip-img" />
                    </div>
                    <div className="about-strip-text">
                        <span className="hero-label">קצת עלי</span>
                        <h2>שמרית בן עמי —<br />מלווה אתכם לחיים טובים יותר</h2>
                        <p>בוגרת תואר ראשון במנהל עסקים, מכללת "אילמה" במגמת בריאות טבעית ועין הבדולח וכן בוגרת מכללת "תוצאות NLP Master-Practitioner".</p>
                        <p>ניסיון החיים העשיר שלי ותהליך אישי ומורכב שעברתי הביא רצון לעזור לאחרים להתפתח ולהצליח.</p>
                        <div className="about-creds">
                            <div className="cred-item"><div className="cred-dot"></div>קואצ'ינג אישי, NLP Master-Practitioner</div>
                            <div className="cred-item"><div className="cred-dot"></div>בריאות טבעית ועין הבדולח</div>
                            <div className="cred-item"><div className="cred-dot"></div>מנחת סדנאות מנדלות</div>
                        </div>
                        <button className="btn-primary" onClick={() => navigate("/about")}>קראו עוד עלי</button>
                    </div>
                </div>
            </section>

            {/* ── Blog + Recipes Preview ── */}
            <BlockPreview type="blog" />
            <BlockPreview type="recipes" />

            {/* ── CTA Banner ── */}
            <section className="cta-banner">
                <div className="container">
                    <h2>מוכנים להתחיל?</h2>
                    <p>פגישת היכרות ראשונה ללא עלות — ללא התחייבויות</p>
                    <div className="cta-banner-btns">
                        <button className="btn-primary" onClick={() => navigate("/contact")}>קביעת פגישה עכשיו</button>
                        <button className="btn-outline" onClick={() => navigate("/plans")}>ראו את התכניות</button>
                    </div>
                </div>
            </section>

        </div>
    )
}
