import { useNavigate } from "react-router"
import image1 from "../assets/images/image1.jpeg"
import { ImageBasic } from "../cmps/ImageBasic"

export function AboutPage() {
    const navigate = useNavigate()

    return (
        <div className="about-page">

            {/* ── Hero ── */}
            <section className="about-hero">
                <div className="about-hero-inner container">
                    <div className="about-photo-wrap">
                        <ImageBasic src={image1} className="about-hero-img" />
                    </div>
                    <div className="about-intro">
                        <span className="hero-label">אודות</span>
                        <h1>שלום, אני שמרית —<br />כאן כדי לעזור לכם לבחור את הדרך</h1>
                        <p>
                            בוגרת תואר ראשון במנהל עסקים, בוגרת מכללת "אילמה" במגמת בריאות טבעית ועין הבדולח
                            וכן בוגרת מכללת "תוצאות NLP Master-Practitioner". 5 שנות ניסיון קליני.
                        </p>
                        <p>
                            ניסיון החיים העשיר שלי ותהליך אישי ומורכב שעברתי הביא איתו רצון וצורך ממשי
                            להתפתחות אישית וכפועל יוצא מכך גם המון רצון לעזור לאחרים.
                        </p>
                        <p>בנוסף, אני מנחת סדנאות יצירה בתחום המנדלות.</p>
                        <div className="about-cred-list">
                            <div className="about-cred-item"><span className="cred-check">✓</span> B.Sc. מנהל עסקים</div>
                            <div className="about-cred-item"><span className="cred-check">✓</span> NLP Master-Practitioner</div>
                            <div className="about-cred-item"><span className="cred-check">✓</span> בריאות טבעית ועין הבדולח</div>
                            <div className="about-cred-item"><span className="cred-check">✓</span> מנחת סדנאות מנדלות</div>
                        </div>
                        <button className="btn-primary" onClick={() => navigate("/contact")}>בואו נדבר</button>
                    </div>
                </div>
            </section>

            {/* ── Philosophy ── */}
            <section className="about-philosophy">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">הפילוסופיה שלי</div>
                        <h2 className="section-title">על מה אני מסתכלת בתהליך</h2>
                    </div>
                    <div className="philosophy-grid">
                        <div className="philosophy-card">
                            <div className="philosophy-icon">🎯</div>
                            <h3>אין "תוכנית אחת לכולם"</h3>
                            <p>הסיפור שלך שלך. ההיסטוריה שלך שלך. הצרכים שלך שלך. אני בונה תהליך שמדייק לאדם הספציפי שעומד מולי.</p>
                        </div>
                        <div className="philosophy-card">
                            <div className="philosophy-icon">🌱</div>
                            <h3>שינוי מתחיל — לא מלמעלה</h3>
                            <p>תהליכים אמיתיים באים מבפנים. לא נכפים מבחוץ. אני עוזרת לך לגלות את הכוח שכבר קיים בך.</p>
                        </div>
                        <div className="philosophy-card">
                            <div className="philosophy-icon">💚</div>
                            <h3>הגוף והנפש — קשורים</h3>
                            <p>תזונה, שינה, רגשות, עייפות — כולם משפיעים על החיים שלך. אני עובדת על כל המשתנים יחד.</p>
                        </div>
                        <div className="philosophy-card">
                            <div className="philosophy-icon">🧠</div>
                            <h3>חיבור בין ראש ולב</h3>
                            <p>ידע מקצועי, סרטים, שינוי הרגלים — כולם חשובים. אני עובדת על החיבור האמיתי בין כולם.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Journey ── */}
            <section className="about-journey">
                <div className="container">
                    <div className="journey-grid">
                        <div className="journey-text">
                            <span className="hero-label" style={{ display: 'block', marginBottom: '12px' }}>הסיפור שלי</span>
                            <h2>הגעתי לקואצ'ינג דרך חיים, לא דרך ספרים</h2>
                            <p>
                                גדלתי בתוך חיים מלאים — ילדים, שגשוג, עצמאות, בחירות. יחד עם זאת חשתי שה"להיות נכון" מולנו תמיד נשאר כמשאלה.
                            </p>
                            <p>
                                כשהגעתי לגיל 40 הבנתי שאני רוצה משהו שונה — לא רק להסתפק במסגרות הקיימות. הכשרתי את עצמי, מצאתי את דרכי.
                            </p>
                            <p>
                                היום אני עובדת עם נשים שרוצות להוביל שינוי אמיתי בחייהן — ועזרתי להן למצוא את הדרך שלהן.
                            </p>
                            <button
                                className="btn-outline"
                                style={{ marginTop: '20px' }}
                                onClick={() => navigate("/contact")}
                            >
                                השאירו פרטים
                            </button>
                        </div>
                        <div className="journey-img-wrap">
                            <ImageBasic src={image1} className="journey-img" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta-banner">
                <div className="container">
                    <h2>רוצים להכיר?</h2>
                    <p>פגישת היכרות ראשונה ללא עלות — בואו נראה יחד מה אפשר לעשות</p>
                    <div className="cta-banner-btns">
                        <button className="btn-primary" onClick={() => navigate("/contact")}>קביעת פגישה עכשיו</button>
                    </div>
                </div>
            </section>

        </div>
    )
}
