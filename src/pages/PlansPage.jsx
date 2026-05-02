import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { PlanPreview } from "../cmps/PlanPreview"
import { mainService } from "../services/main.service"
import { CTABanner } from "../cmps/CTABanner"
import { siteConfig } from "../services/site.config"

export function PlansPage() {
    const [plans, setPlans] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadPlans()
    }, [])

    async function loadPlans() {
        try {
            const items = await mainService.query("plans")
            setPlans(items)
        } catch (err) {
            console.error('err: cannot load plans:', err)
        }
    }

    return (
        <div className="plans-page">

            {/* ── Page Hero ── */}
            <section className="page-hero hero-section">
                <div className="container">
                    <span className="hero-label">תכניות ליווי אישי</span>
                    <h1 className="page-hero-title">
                        הדרך שלכם לבחור נכון —<br />
                        <span>תכניות הליווי</span>
                    </h1>
                    <p className="page-hero-desc">
                        זה הזמן להעניק לעצמכם את המתנה של בריאות, חיוניות ושמחה.
                        דמיינו שאתם קמים בבוקר מלאי אנרגיה, הגוף שלכם מרגיש קליל,
                        המחשבה צלולה, ואתם יודעים בדיוק מה נכון עבורכם.
                    </p>
                </div>
            </section>

            {/* ── "זה לא חלום" Section ── */}
            <section className="plans-desc">
                <div className="container">
                    <h2 className="plans-desc-title">זה לא חלום – זו בחירה</h2>
                    <p>
                        התוכניות שלי נועדו כדי לתת לכם את הכלים להחזיר את האיזון הביתה:
                        להזין את הגוף במזון טעים ומבריא, לשחרר את מה שלא משרת אתכם
                        ולבנות הרגלים שמחזיקים מעמד לאורך זמן.
                    </p>

                    <h3 className="plans-tracks-title">מה הדרך המדויקת עבורך?</h3>
                    <p>לכל אחד מאיתנו צרכים שונים וקצב שונה. לכן, יצרתי שלושה מסלולים שונים שמתמקדים בשינוי מהשורש:</p>

                    <div className="plans-tracks">
                        <div className="plans-track">
                            <div className="track-icon">🥗</div>
                            <div>
                                <strong>ירידה במשקל בדרך הטבע</strong>
                                <p>ליווי לשינוי תזונתי והפחתת משקל מתוך הקשבה לגוף, ללא "דיאטות" קיצוניות.</p>
                            </div>
                        </div>
                        <div className="plans-track">
                            <div className="track-icon">⚖️</div>
                            <div>
                                <strong>איזון אורח חיים</strong>
                                <p>בניית שגרה בריאה שמשלבת תזונה, תנועה ורוגע בתוך מירוץ החיים.</p>
                            </div>
                        </div>
                        <div className="plans-track">
                            <div className="track-icon">🧠</div>
                            <div>
                                <strong>התפתחות אישית והצבת מטרות</strong>
                                <p>עבודה עמוקה (בכלי NLP) על תודעה, חסמים והשגת המטרות שחשובות לכם באמת.</p>
                            </div>
                        </div>
                    </div>

                    <p className="plans-desc-note">
                        אני מזמינה אתכם לשיחת היכרות ללא עלות וללא התחייבות. נשוחח, נכיר, ונבין יחד מה הצעד הקטן הראשון שיעשה עבורכם שינוי גדול.
                    </p>
                </div>
            </section>

            {/* ── Plans Grid ── */}
            <section className="plans-grid-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">בחרו את התכנית שלכם</div>
                        <h2 className="section-title">מה הכי מתאים לך?</h2>
                        <p className="section-subtitle">כל תוכנית נבנית על שיחת היכרות עמוקה — ולא על תבנית קבועה מראש.</p>
                    </div>
                    <div className="plans-container">
                        {plans.map(plan => (
                            <PlanPreview plan={plan} key={plan._id} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <CTABanner content={siteConfig.ctaTxt.plans} />

        </div>
    )
}
