import { useNavigate } from "react-router";
import postDefault from "../assets/images/post_default.png"

export function PlanPreview({ plan }) {
    const navigate = useNavigate()
    console.log('plan:', plan)
    return (
        <div className="plan-preview" onClick={() => navigate(`/plans/${plan._id}`)}>
            <div className="image-container">
                <img src={plan.imageUrl?.[1] || postDefault} onError={(ev) => { ev.target.onerror = null; ev.target.src = postDefault }} />
            </div>
            <h2 className="plan-title">{plan.title}</h2>
            <div className="preview-content" dangerouslySetInnerHTML={{ __html: plan.previewContent }}></div>
        </div >
    )
}