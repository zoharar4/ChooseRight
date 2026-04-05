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
                <button className="return-btn" onClick={() => navigate('/plans')}>חזור</button>
            </div>
            <div className="image-preview"> {/* גריד עם 2 columns שווים */}
                <div className="content-container">
                    <h1>{plan.title}</h1>
                    <div className="preview-content" dangerouslySetInnerHTML={{ __html: plan.previewContent }}></div>
                </div>
                <div className="image-container">
                    <ImageBasic src={plan.imageUrl[1]} alt={plan.title} /> {/*  תמונה עם object-fit:cover, width / height: 100%*/}
                </div>
            </div>

            <hr />
            <div>
                <div className="content" dangerouslySetInnerHTML={{ __html: plan.content }}></div>
            </div>

        </div>
    )
}