import { useState } from "react"


export function ContactForm() {
    const formDefault = { fullname: '', phoneNum: '', email: '', contant: '' }

    const [formData, setFormData] = useState(formDefault)
    const [isFormSent, setIsFormSent] = useState(false)


    function handleChange(ev, type) {
        setFormData(data => ({ ...data, [type]: ev.target.value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()

        setFormData(formDefault)
        setIsFormSent(true)
        setTimeout(() => {
            setIsFormSent(false)
        }, 4000)
    }

    return (
        <div className="contact-form">
            <form action="" onSubmit={ev => onSubmit(ev)}>
                <h2>יצירת קשר</h2>
                <div className="form1">
                    <div>
                        <label htmlFor="fullname">שם מלא *</label>
                        <input onChange={(ev) => handleChange(ev, "fullname")} value={formData.fullname} type="text" id="fullname" />
                    </div>

                    <div>
                        <label htmlFor="phone-num">טלפון *</label>
                        <input onChange={(ev) => handleChange(ev, "phoneNum")} value={formData.phoneNum} type="tel" id="phone-num" />
                    </div>
                </div>

                <div className="form2">
                    <label htmlFor="email">Email *</label>
                    <input onChange={(ev) => handleChange(ev, "email")} value={formData.email} type="email" id="email" />
                </div>

                <div className="form3">
                    <label htmlFor="contant">שליחת הודעה</label>
                    <textarea onChange={(ev) => handleChange(ev, 'contant')} value={formData.contant} name="contant" id="contant"></textarea>
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