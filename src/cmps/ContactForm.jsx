import { useRef, useState } from "react"


export function ContactForm() {
    const formDefault = { fullname: '', phoneNum: '', email: '', message: '' }

    const [formData, setFormData] = useState(formDefault)
    const [isFormSent, setIsFormSent] = useState(false)
    const [errors, setErrors] = useState({})
    const timeOutRef = useRef(null)

    function sendForm() {
        emailjs.send(import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_TEMPLATE_ID, formData).then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );
    }

    function handleChange(ev, type) {
        setFormData(data => ({ ...data, [type]: ev.target.value }))
        if (errors[type]) {

        }
        setErrors(err => ({ ...err, [type]: '' }))
    }

    function onSubmit(ev) {
        ev.preventDefault()

        const isValid = validateForm()
        if (!isValid || isFormSent) return

        sendForm({ ...formData })

        setFormData(formDefault)
        setIsFormSent(true)

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }

        timeOutRef.current = setTimeout(() => {
            setIsFormSent(false)
        }, 4000)
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
            <form action="" onSubmit={ev => onSubmit(ev)} noValidate>
                <h2>יצירת קשר</h2>
                <div className="form1">
                    <div>
                        <label htmlFor="fullname">שם מלא *</label>
                        <input onChange={(ev) => handleChange(ev, "fullname")} value={formData.fullname} type="text" id="fullname" />
                        {errors.fullname && <span className="error">{errors.fullname}</span>}
                    </div>

                    <div>
                        <label htmlFor="phone-num">טלפון *</label>
                        <input onChange={(ev) => handleChange(ev, "phoneNum")} value={formData.phoneNum} type="tel" id="phone-num" />
                        {errors.phoneNum && <span className="error">{errors.phoneNum}</span>}
                    </div>
                </div>

                <div className="form2">
                    <label htmlFor="email">Email *</label>
                    <input onChange={(ev) => handleChange(ev, "email")} value={formData.email} type="email" id="email" />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form3">
                    <label htmlFor="message">שליחת הודעה</label>
                    <textarea onChange={(ev) => handleChange(ev, 'message')} value={formData.message} name="message" id="message"></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>

                <button className="sent-btn">שליחה</button>
                {isFormSent &&
                    <div className="success-message">תודה! קיבלנו את הפרטים שלך וניצור קשר בהקדם.
                    </div>
                }
            </form>
        </div>
    )
}