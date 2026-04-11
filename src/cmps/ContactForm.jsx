import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { emailService } from "../services/email.service"
import { Loading } from "./Loading"

const FORM_DEFAULT = { fullname: '', phoneNum: '', email: '', topic: '', message: '' }

export function ContactForm() {
    const [formData, setFormData] = useState(FORM_DEFAULT)
    const [errors, setErrors] = useState({})
    const [isSending, setIsSending] = useState(false)
    const [isFormSent, setIsFormSent] = useState(false)
    const [sendError, setSendError] = useState(false)
    const timeOutRef = useRef(null)

    function handleChange(ev, field) {
        setFormData(data => ({ ...data, [field]: ev.target.value }))
        setErrors(err => ({ ...err, [field]: '' }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        if (!validateForm() || isSending) return

        setSendError(false)
        setIsSending(true)
        try {
            await emailService.send("contact", { ...formData })
            setFormData(FORM_DEFAULT)
            setIsFormSent(true)
            if (timeOutRef.current) clearTimeout(timeOutRef.current)
            timeOutRef.current = setTimeout(() => setIsFormSent(false), 10000)
        } catch (err) {
            console.error("Failed to send email:", err)
            setSendError(true)
        } finally {
            setIsSending(false)
        }
    }

    function validateForm() {
        const newErrors = {}

        if (!formData.fullname.trim()) {
            newErrors.fullname = "יש להזין שם מלא"
        } else if (formData.fullname.trim().length < 2) {
            newErrors.fullname = "השם חייב להכיל לפחות 2 תווים"
        } else if (!/^[a-zA-Zא-ת\s'-]+$/.test(formData.fullname)) {
            newErrors.fullname = "השם יכול להכיל אותיות בלבד"
        }

        if (!formData.phoneNum.trim()) {
            newErrors.phoneNum = "יש להזין מספר טלפון"
        } else if (!/^05\d{8}$/.test(formData.phoneNum)) {
            newErrors.phoneNum = "חייב להכיל 10 ספרות ולהתחיל ב-05"
        }

        if (!formData.email.trim()) {
            newErrors.email = "יש להזין כתובת אימייל"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "פורמט האימייל אינו תקין"
        }

        if (!formData.message.trim()) {
            newErrors.message = "יש להזין תוכן הודעה"
        } else if (formData.message.length < 5) {
            newErrors.message = "ההודעה חייבת להכיל לפחות 5 תווים"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return (
        <div className="contact-form">
            <form onSubmit={onSubmit} noValidate>
                <h2>יצירת קשר</h2>

                <div className="form1">
                    <div>
                        <label htmlFor="fullname">שם מלא *</label>
                        <input onChange={ev => handleChange(ev, "fullname")} value={formData.fullname} type="text" id="fullname" />
                        {errors.fullname && <span className="error">{errors.fullname}</span>}
                    </div>
                    <div>
                        <label htmlFor="phone-num">טלפון *</label>
                        <input onChange={ev => handleChange(ev, "phoneNum")} value={formData.phoneNum} type="tel" id="phone-num" />
                        {errors.phoneNum && <span className="error">{errors.phoneNum}</span>}
                    </div>
                </div>

                <div className="form2">
                    <label htmlFor="email">Email *</label>
                    <input onChange={ev => handleChange(ev, "email")} value={formData.email} type="email" id="email" />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-topic">
                    <label htmlFor="topic">נושא הפנייה</label>
                    <select onChange={ev => handleChange(ev, "topic")} value={formData.topic} id="topic">
                        <option value="">בחרו נושא...</option>
                        <option value="קבלת מידע">קבלת מידע</option>
                        <option value="פגישה">פגישה</option>
                        <option value="שאלה כללית">שאלה כללית</option>
                        <option value="אחר">אחר</option>
                    </select>
                </div>

                <div className="form3">
                    <label htmlFor="message">שליחת הודעה *</label>
                    <textarea onChange={ev => handleChange(ev, 'message')} value={formData.message} name="message" id="message" />
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>

                <button className="sent-btn" type="submit" disabled={isSending}>
                    {isSending ? <Loading isTxt={false} /> : 'שליחה'}
                </button>

                {isFormSent && (
                    <div className="form-feedback success-message">
                        תודה! קיבלנו את הפרטים שלך וניצור קשר בהקדם.
                    </div>
                )}

                {sendError && (
                    <div className="form-feedback error-message">
                        קרתה תקלה בשליחת הטופס.{' '}
                        <Link to="/contact">אפשרויות נוספות ליצירת קשר</Link>
                        {' '}זמינות בעמוד יצירת הקשר, ונשמח לדיווח על התקלה.
                    </div>
                )}
            </form>
        </div>
    )
}
