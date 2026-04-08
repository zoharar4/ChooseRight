import { useNavigate } from "react-router"
import postDefault from "../assets/images/post_default.png"

export function PlanPreview({ plan }) {
    const navigate = useNavigate()

    return (
        <div className="plan-card" onClick={() => navigate(`/plans/${plan._id}`)}>
            <div className="plan-card-img">
                <img
                    src={plan.imageUrl?.[1] || postDefault}
                    alt={plan.title}
                    onError={(ev) => { ev.target.onerror = null; ev.target.src = postDefault }}
                />
            </div>
            <div className="plan-card-body">
                <h2 className="plan-title">{plan.title}</h2>
                <div
                    className="plan-preview-content"
                    dangerouslySetInnerHTML={{ __html: plan.previewContent }}
                />
                <span className="plan-card-cta">פרטים נוספים ←</span>
            </div>
        </div>
    )
}
