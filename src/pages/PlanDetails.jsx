import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { mainService } from "../services/main.service"
import { Loading } from "../cmps/Loading"
import { ImageBasic } from "../cmps/ImageBasic"


export function PlanDetails() {
    const { id } = useParams()
    const [plan, setPlan] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadPlan()
    }, [id])

    async function loadPlan() {
        try {
            const res = await mainService.getById('plans', id)
            setPlan(res)
        } catch (err) {
            console.error('cannot get plan by id,', err)
        }
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
            <div className="image-preview"> 
                <div className="content-container">
                    <h1>{plan.title}</h1>
                    <div className="preview-content" dangerouslySetInnerHTML={{ __html: plan.previewContent }}></div>
                </div>
                <div className="image-container">
                    <ImageBasic src={plan.imageUrl[1]} alt={plan.title} /> 
                </div>
            </div>

            <hr />
            <div>
                <div className="content" dangerouslySetInnerHTML={{ __html: plan.content }}></div>
            </div>

        </div>
    )
}