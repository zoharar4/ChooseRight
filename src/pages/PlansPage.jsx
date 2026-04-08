import { useEffect, useState } from "react"
import { PlanPreview } from "../cmps/PlanPreview"
import { mainService } from "../services/main.service"

export function PlansPage() {
    const [plans, setPlans] = useState([])

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
            <section className="page-hero">
                <div className="container">
                    <span className="hero-label">תכניות ליווי אישי</span>
                    <h1 className="page-hero-title">
                        ליווי שמותאם<br />
                        <span>בדיוק לך</span>
                    </h1>
                    <p className="page-hero-desc">
                        ליווי אישי מקצועי — ללא תבניות מוכנות מראש. כל תוכנית נבנית עם הצרכים שלך.
                    </p>
                </div>
            </section>

            {/* ── Description ── */}
            <section className="plans-desc">
                <div className="container">
                    <p>תכניות הליווי שאני מציעה חלקן אישיות וחלקן קבוצתיות.</p>
                    <p>לכל תכנית יש את היתרונות שלה ואת ההתאמה לאנשים שונים ולצרכים שונים.</p>
                    <p>ישנם אנשים שזקוקים יותר לליווי אישי 'אחד על אחד' וישנם אנשים שדווקא הכוח של הקבוצה הוא זה שמחזק אותם.</p>
                    <p>בכל תכנית אני מביאה לידי ביטוי את הידע הרב שצברתי ואת הניסיון שלי ומחברת אותו עם הצורך והרצון של מי שפונה אליי.</p>
                    <p className="plans-desc-note bold">
                        אני מבינה את הצורך להכיר קודם ולהבין האם תהליך הליווי יכול להתאים לכם, לכן ישנה אפשרות לתאם מפגש/שיחת הכרות ללא עלות ורק לאחר מכן להחליט האם מעוניינים להרשם.
                    </p>
                </div>
            </section>

            {/* ── Plans Grid ── */}
            <section className="plans-grid-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">בחרו את התכנית שלכם</div>
                        <h2 className="section-title">מה הכי מתאים לך?</h2>
                        <p className="section-subtitle">כל תוכנית בנויה על שיחת היכרות עמוקה — ולא על תבנית קבועה מראש.</p>
                    </div>
                    <div className="plans-container">
                        {plans.map(plan => (
                            <PlanPreview plan={plan} key={plan._id} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}
