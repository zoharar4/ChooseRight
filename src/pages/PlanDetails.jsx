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
        <div className="plan-details" style={{ padding: '16px' }}>
            <div>
                <h1>{plan.title}</h1>
                <button className="return-btn" onClick={() => navigate('/plans')}>חזור</button>
            </div>
            <div>
                <ImageBasic src={plan.imageUrl[1]} alt={plan.title} />
                <div dangerouslySetInnerHTML={{ __html: plan.previewContent }}></div>
            </div>

            <div>
                <div dangerouslySetInnerHTML={{ __html: plan.content }}></div>
            </div>

        </div>
    )
}