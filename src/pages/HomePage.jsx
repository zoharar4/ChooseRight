import { useNavigate } from "react-router"
import image1 from "../assets/images/image1.jpeg"
import { BlockPreview } from "../cmps/BlockPreview.jsx"
import { ImageBasic } from "../cmps/ImageBasic.jsx"

export function HomePage() {
    const navigate = useNavigate()

    return (
        <div className="home-page">

            {/* ── Hero ── */}
            <section className="home-hero hero-section">
                <div className="home-hero-inner container">
                    <div className="home-hero-text">
                        <span className="hero-label">קואצ'ינג אישי מקצועי</span>
                        <h1 className="home-hero-title">
                            החופש לבחור<br />
                            <span>בחיים בריאים יותר</span>
                        </h1>
                        <p className="home-hero-desc">
                            הבריאות שלנו היא המצב הטבעי שבו אנו מחוברים לעצמנו, לגופנו ולתחושות שלנו.
                            אני כאן כדי לעזור לך למצוא את הדרך החזרה אליהם.
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

            {/* ── Philosophy Section ── */}
            <section className="home-philosophy">
                <div className="container home-philosophy-inner">
                    <blockquote className="philosophy-quote">
                        "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ..."
                    </blockquote>
                    <p>
                        המילה <strong>בריאות</strong> טומנת בחובה את המילה <strong>בריאה</strong>.
                        העולם נברא כשהוא שלם, מאוזן ובריא – וכך גם אנחנו.
                        הבריאות שלנו היא המצב הטבעי שבו אנו מחוברים לעצמנו, לגופנו ולתחושות שלנו.
                    </p>
                    <p>
                        אבל במירוץ החיים, קל לאבד את הקשב. כשאנחנו מפסיקים להקשיב לגוף, האיזון מופר.
                        זה יכול להופיע כעייפות כרונית, אכילה רגשית, מחלות שונות או פשוט תחושה שמשהו תקוע.
                        כשאנחנו לא באיזון, אנחנו לא פנויים לחיות חיים בעלי משמעות.
                    </p>
                    <p className="philosophy-highlight">
                        להיות בריא זה להיות חופשי – חופשי להגשים את הייעוד שלנו בעולם.
                    </p>
                </div>
            </section>

            {/* ── "המחזר?" Section ── */}
            <section className="home-cycle">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">מוכר לכם <span>הממחר?</span></h2>
                        <p className="section-subtitle">כמה פעמים הבטחתם לעצמכם:</p>
                    </div>
                    <div className="cycle-promises">
                        <div className="cycle-promise">"ממחר אני מתחיל/ה לאכול נכון..."</div>
                        <div className="cycle-promise">"ממחר אני חוזר/ת להתאמן..."</div>
                        <div className="cycle-promise">"מהפעם הבאה אני בוחר/ת אחרת..."</div>
                    </div>
                    <p className="cycle-text">
                        ואז הגיע מחר, וההרגלים הישנים שוב לקחו את המושכות?
                        אתם יודעים שיש דרך פשוטה וטובה יותר להרגיש טוב,
                        אתם מרגישים את זה בקצות האצבעות.
                    </p>
                    <p className="cycle-question">אבל איך עושים את זה באמת?</p>
                </div>
            </section>

            {/* ── About Strip ── */}
            <section className="home-about-strip">
                <div className="home-about-inner container">
                    <div className="about-strip-text">
                        <span className="hero-label">הדרך שלכם לאיזון</span>
                        <h2>אני לא מציעה פתרונות קסם.<br />אני מציעה דרך.</h2>
                        <p>
                            גם אני הייתי שם. גם אני התמודדתי עם אלרגיות חוזרות, עייפות שלא נגמרת
                            וחוסר איזון גופני ונפשי שחיפש מענה. מתוך הקושי האישי שלי, יצאתי למסע
                            של למידה וגילוי.
                        </p>
                        <p>
                            מצאתי שיטה שעבדה עבורי ועבור רבים אחרים – שיטה שמחברת בין הגוף לנפש
                            ומחזירה את הכוח לבחור. האמת היא שאין דרך אחת שמתאימה לכולם.
                        </p>
                        <p>
                            לכל אחד ואחת יש את הנתיב המדויק להם להתחבר לכוחות הפנימיים, להבריא
                            ולהגשים את הפוטנציאל הגלום בהם. התפקיד שלי הוא לעזור לכם למצוא את הנתיב שלכם.
                        </p>
                        <p><strong>נעים להכיר,</strong></p>
                        <p>
                            אני אמא ל-9 ילדים מופלאים, מנחת סדנאות מנדלות, ובעלת ניסיון חיים עשיר
                            שלימד אותי מהי צמיחה מתוך משבר. הידע הרשמי שאני מביאה איתי:
                        </p>
                        <div className="about-creds">
                            <div className="cred-item"><div className="cred-dot"></div>בוגרת מכללת "אילמה" – בריאות טבעית ועין הבדולח</div>
                            <div className="cred-item"><div className="cred-dot"></div>NLP Master-Practitioner (מכללת "תוצאות")</div>
                            <div className="cred-item"><div className="cred-dot"></div>תואר ראשון במנהל עסקים</div>
                        </div>
                        <p>
                            השילוב בין עולם הבריאות הטבעית לבין עולם ה-NLP מאפשר לנו לעבוד גם על ה"מה"
                            (מה לאכול, איך לנוע) וגם על ה"איך" (איך לשנות דפוסי חשיבה וליצור הרגלים מנצחים).
                        </p>
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
                    <h2>זה הזמן לבחור נכון</h2>
                    <p>
                        עכשיו זה הזמן הכי טוב להתחיל. אני מזמינה אותך ליצור איתי קשר,
                        ויחד נבין איך להחזיר את האיזון לחייך ולמצוא את הדרך המיוחדת שלך לחיות בטוב.
                    </p>
                    <div className="cta-banner-btns">
                        <button className="btn-primary" onClick={() => navigate("/contact")}>קביעת פגישה עכשיו</button>
                        <button className="btn-outline" onClick={() => navigate("/plans")}>ראו את התכניות</button>
                    </div>
                </div>
            </section>

        </div>
    )
}
