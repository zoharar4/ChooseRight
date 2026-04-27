import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { mainService } from "../services/main.service"
import { utilService } from "../services/util.service"
import { Loading } from "../cmps/Loading"
import { ImageBasic } from "../cmps/ImageBasic"
import { ContactForm } from "../cmps/ContactForm"

export function PlanDetails() {
    const { id } = useParams()
    const [plan, setPlan] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [prefill, setPrefill] = useState(null)
    const formRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadPlan()
    }, [id])

    async function loadPlan() {
        try {
            const res = await mainService.getById('plans', id)
            utilService.devLog(`Plan loaded — ${id}`, res)
            setPlan(res)
        } catch (err) {
            console.error('cannot get plan by id,', err)
        }
    }

    function handleOpenForm() {
        setShowForm(true)
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    }

    function handlePrefill(type) {
        const map = {
            info: { topic: 'קבלת מידע', message: `אשמח לקבל עוד מידע לגבי ${plan.title}` },
            register: { topic: 'הרשמה לתוכנית', message: `אני מעוניין/ת להירשם לתוכנית ${plan.title}` },
        }
        setPrefill({ ...map[type] })
    }

    if (!plan) return (
        <div className="plan-details">
            <Loading isForPage={true} />
        </div>
    )

    return (
        <div className="plan-details page">
            <div className="top-container">
                <button className="back-btn" onClick={() => navigate('/plans')} title="חזור">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </button>
            </div>

            <div className="plan-hero">
                <div className="plan-hero-content">
                    <h1>{plan.title}</h1>
                    <div className="preview-content" dangerouslySetInnerHTML={{ __html: plan.previewContent }} />
                </div>
                <div className="plan-hero-image">
                    <ImageBasic src={plan.imageUrl?.[1]} alt={plan.title} />
                </div>
            </div>

            <div className="plan-body">
                <div className="content" dangerouslySetInnerHTML={{ __html: plan.content }} />
            </div>

            <div className="plan-cta">
                {!showForm && (
                    <button className="plan-cta-btn" onClick={handleOpenForm}>
                        להרשמה / קבלת מידע נוסף
                    </button>
                )}
            </div>

            {showForm && (
                <div className="plan-form-section" ref={formRef}>
                    <p className="plan-form-label">בחרו את נושא הפנייה:</p>
                    <div className="plan-form-prefills">
                        <button className="prefill-btn" onClick={() => handlePrefill('info')}>
                            אשמח לקבל עוד מידע לגבי {plan.title}
                        </button>
                        <button className="prefill-btn" onClick={() => handlePrefill('register')}>
                            אני מעוניין/ת להירשם לתוכנית {plan.title}
                        </button>
                    </div>
                    <ContactForm prefill={prefill} />
                </div>
            )}
        </div>
    )
}
