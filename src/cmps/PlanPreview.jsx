import postDefault from "../assets/images/post_default.png"
import imageExaple from "../assets/images/healty meal for weight lost.jpg"

export function PlanPreview({ plan }) {
    return (
        <div className="plan-preview" >
            <div className="image-container">
                <img src={plan.imageUrl || postDefault} onError={(ev) => { ev.target.onerror = null; ev.target.src = postDefault }} />
            </div>
            <h1 className="underline">{plan.title}</h1>
            <p className="bold">{plan.subtitle}</p>
            <p>{plan.details}</p>
            <p><span className="underline">התכנית כוללת</span>:</p>
            <p>{plan.meetings}</p>
            <p><span className="underline">משך התכנית</span>: {plan.duration}</p>
            <p><span className="underline">עלות התכנית</span>: {plan.cost} ש"ח</p>
        </div>
    )
}